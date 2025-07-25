const $SourceUtil = Java.loadClass('com.hollingsworth.arsnouveau.api.util.SourceUtil');
const $EntityFollowProjectile = Java.loadClass('com.hollingsworth.arsnouveau.common.entity.EntityFollowProjectile');

StartupEvents.registry('block', event => {
    // 转化流体配置
    const FLUID_CONFIG = {
    allowed: [
        'minecraft:lava',
    ],
    // 转换率
    conversionRate: {
        'minecraft:lava': 0.5,
    }
};

    /**
     * @param {Internal.IFluidHandler} fluidHandler
     * @param {Internal.FluidStack} beTank
     * @returns {string | null}
     */
    function fluidTester(fluidHandler, beTank) {
        for (let i = 0; i < fluidHandler.getTanks(); i++) {
            let fluid = fluidHandler.getFluidInTank(i)
            if (!fluid.isEmpty()) {
                let fluidType = fluid.getFluid().arch$registryName().toString()
                if (FLUID_CONFIG.allowed.includes(fluidType)) {
                    if (beTank.isEmpty() || beTank.getFluid().isSame(fluid.getFluid())) {
                        return fluidType
                    }
               }
            }   
        }
        return null;
    }
    
    event
        .create('kubejs:fluid_sourcelink')
        .box(0, 0, 0, 16, 17, 16)
        .defaultCutout()
        .blockEntity(info => {
            info.attachCapability(
                CapabilityBuilder.FLUID.customBlockEntity()
                    .getCapacity(() => 6000)
                    .getFluid(be => {
                        let fluidName = be.persistentData.getString('FluidName') || "minecraft:lava"
                        let fluidAmount = be.persistentData.getLong('Amount')
                        return Fluid.of(fluidName, fluidAmount)
                    })
                    .onFill((be, fluidStack, simulate) => {
                        let fluidName = be.persistentData.getString('FluidName')
                        let fluidAmount = be.persistentData.getLong('Amount')
                        if (FLUID_CONFIG.allowed.includes(fluidStack.getId())) {
                            if (fluidAmount <= 0 || fluidName == fluidStack.getId()) {
                                let fillableAmount = Math.min(6000 - fluidAmount, fluidStack.getAmount())
                                if (!simulate) {
                                    be.persistentData.putString('FluidName', fluidStack.getId())
                                    be.persistentData.putLong('Amount', fluidAmount + fillableAmount)
                                }
                                return fillableAmount
                            }
                        }
                        return 0
                    })
                    .onDrain((be, fluidStack, simulate) =>{
                        let fluidName = be.persistentData.getString('FluidName')
                        let fluidAmount = be.persistentData.getLong('Amount')
                        let drainableAmount = Math.min(fluidStack.getAmount(), fluidAmount)
                        if (!simulate) {
                            be.persistentData.putLong('Amount', fluidAmount - drainableAmount)
                        }
                        return drainableAmount
                    })
            );
            info.serverTick(20, 0, be => {
                const { block, level } = be;
                const beCap = be.getCapability(ForgeCapabilities.FLUID_HANDLER).resolve().get();
                const beTank = beCap.getFluidInTank(0)

                // 抽取流体
                const fluidTank = block.down.entity
                let fluidSpace = beCap.getTankCapacity(0) - beTank.getAmount()
                if (fluidSpace > 0){
                    if (fluidTank !== null && fluidTank.getCapability(ForgeCapabilities.FLUID_HANDLER, Direction.UP).isPresent()) {
                        const isFluidHandler = fluidTank.getCapability(ForgeCapabilities.FLUID_HANDLER, Direction.UP).resolve().isPresent()
                        const fluidHandler = isFluidHandler ? fluidTank.getCapability(ForgeCapabilities.FLUID_HANDLER, Direction.UP).resolve().get() : null

                        const providerFluidType = fluidTester(fluidHandler, beTank)
                        if (fluidHandler != null && providerFluidType != null) {
                            const transferFluidAmount = Math.min(1000, fluidSpace)
                            const drainTry = fluidHandler.drain(Fluid.of(providerFluidType, transferFluidAmount), 'simulate')
                            if (drainTry.getAmount() > 0) {
                                beCap.fill(Fluid.of(providerFluidType, drainTry.getAmount()), 'execute')
                                fluidHandler.drain(Fluid.of(providerFluidType, drainTry.getAmount()), 'execute')
                            }

                        }  
                    }
                }

                // 转换source
                if (!beTank.isEmpty()) {
                    const storedFluidType = beTank.getFluid().arch$registryName().toString();
                    const conversionRate = FLUID_CONFIG.conversionRate[storedFluidType]

                    const sourceProviders = $SourceUtil.canGiveSource(block.pos, level, 6)
                    if (sourceProviders.length == 0) return;

                    let closestProvider = null;
                    let minDistance = Infinity;

                    for (const provider of sourceProviders) {
                        const distance = block.pos.distManhattan(provider.getCurrentPos());
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestProvider = provider;
                        }
                    }

                    const maxSourceToAdd = closestProvider.getSource().getMaxSource() - closestProvider.getSource().getSource();
                    const maxFluidToDrain = Math.floor(maxSourceToAdd / conversionRate)

                    const transferFluidAmount = Math.min(1000, maxFluidToDrain)

                    if (transferFluidAmount <= 0) return;

                    const sourceToAdd = transferFluidAmount * conversionRate;

                    beCap.drain(Fluid.of(storedFluidType, transferFluidAmount), 'execute');
                    closestProvider.getSource().addSource(sourceToAdd);

                    const projectile = new $EntityFollowProjectile(
                        level, 
                        block.pos, 
                        closestProvider.getCurrentPos(),
                        255, 25, 180
                    );
                    level.addFreshEntity(projectile)
                }
            });
        })
})