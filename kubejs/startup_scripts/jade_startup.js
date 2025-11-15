const $SnowmanCoolerBlockEntity = Java.loadClass('fr.iglee42.cmr.cooler.SnowmanCoolerBlockEntity');

JadeEvents.onCommonRegistration(event => {
    event.blockDataProvider('r2aot:snowman_cooler', $BlockEntity).setCallback((tag, accessor) => {
        /** @type {{ blockEntity: Internal.SnowmanCoolerBlockEntity, block: Internal.Block  }} */
        const { blockEntity, block } = accessor;
        if (block.id !== 'cmr:snowman_cooler') return;

        if (blockEntity.activeFuel && blockEntity.remainingBurnTime) {
            tag.putInt('activeFuel', blockEntity.activeFuel.ordinal());
            tag.putInt('remainingBurnTime', blockEntity.remainingBurnTime);
        }
    });
});
