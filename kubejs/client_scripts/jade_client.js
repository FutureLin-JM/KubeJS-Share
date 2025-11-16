const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
const $SnowmanCoolerBlockEntity = Java.loadClass('fr.iglee42.cmr.cooler.SnowmanCoolerBlockEntity');
const $FuelType = Java.loadClass('fr.iglee42.cmr.cooler.SnowmanCoolerBlockEntity$FuelType');
const $HeatLevel = Java.loadClass('fr.iglee42.cmr.cooler.SnowmanCoolerBlock$HeatLevel');
const $IElementHelper = Java.loadClass('snownee.jade.api.ui.IElementHelper');

JadeEvents.onClientRegistration(event => {
    event.block('kubejs:snowman_cooler', $Block).tooltip((tooltip, accessor) => {
        /** @type {{ blockEntity: Internal.SnowmanCoolerBlockEntity, serverData: Internal.CompoundTag  }} */
        const { blockEntity, serverData } = accessor;
        if (!serverData) return;

        let isCreative = serverData.getBoolean('isCreative');
        let remainingBurnTime = serverData.getInt('remainingBurnTime');
        let activeFuel = $FuelType.NONE;
        if (isCreative) {
            let heatLevel = blockEntity.getHeatLevelFromBlock();
            if (heatLevel == $HeatLevel.COOLING) {
                activeFuel = $FuelType.NORMAL;
            } else if (heatLevel == $HeatLevel.FREEZING) {
                activeFuel = $FuelType.SPECIAL;
            }
        } else {
            activeFuel = $FuelType.values()[serverData.getInt('activeFuel')];
        }

        if (activeFuel == $FuelType.NONE) return;

        let activeFuelItem = activeFuel == $FuelType.SPECIAL ? Items.ICE : Items.SNOWBALL;
        tooltip['add(snownee.jade.api.ui.IElement)']($IElementHelper.get().smallItem(activeFuelItem));
        if (isCreative) {
            tooltip.append(Text.translatable('jade.infinity'));
        } else {
            let seconds = Math.floor(remainingBurnTime / 20);
            tooltip.append(Text.translatable('jade.tooltip.snowman_cooler', seconds));
        }
    });
});
