const $BlockEntity = Java.loadClass('net.minecraft.world.level.block.entity.BlockEntity');
const $SnowmanCoolerBlockEntity = Java.loadClass('fr.iglee42.cmr.cooler.SnowmanCoolerBlockEntity');

JadeEvents.onCommonRegistration(event => {
    event.blockDataProvider('kubejs:snowman_cooler', $BlockEntity).setCallback((tag, accessor) => {
        /** @type {{ blockEntity: Internal.SnowmanCoolerBlockEntity, block: Internal.Block  }} */
        const { blockEntity, block } = accessor;
        if (block.id !== 'cmr:snowman_cooler') return;

        if (blockEntity.isCreative()) {
            tag.putBoolean('isCreative', true);
        } else if(blockEntity.activeFuel && blockEntity.remainingBurnTime) {
            tag.putInt('activeFuel', blockEntity.activeFuel.ordinal());
            tag.putInt('remainingBurnTime', blockEntity.remainingBurnTime);
        }
    });
});
