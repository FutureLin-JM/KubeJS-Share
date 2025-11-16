const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
const $IElementHelper = Java.loadClass('snownee.jade.api.ui.IElementHelper');

JadeEvents.onClientRegistration(event => {
    event.block('kubejs:snowman_cooler', $Block).tooltip((tooltip, accessor) => {
        const { serverData } = accessor;
        if (!serverData) return;
        let activeFuel = serverData.get('activeFuel');
        let remainingBurnTime = serverData.get('remainingBurnTime');
        let activeFuelIcon;
        if (activeFuel && remainingBurnTime) {
            if (activeFuel == 1) {
                activeFuelIcon = $IElementHelper.get().smallItem(Items.SNOWBALL);
            } else if (activeFuel == 2) {
                activeFuelIcon = $IElementHelper.get().smallItem(Items.ICE);
            }
            tooltip['add(snownee.jade.api.ui.IElement)'](activeFuelIcon);
            let seconds = Math.floor(remainingBurnTime / 20);
            let coolerText = Text.translatable('jade.tooltip.snowman_cooler', seconds);
            tooltip.append(coolerText);
        }
    });
});
