const $ImbuementTile = Java.loadClass('com.hollingsworth.arsnouveau.common.block.tile.ImbuementTile');
const $ThermoTile = Java.loadClass('owmii.powah.block.thermo.ThermoTile');

const recipes = global.imbuementChargeRecipes.map(recipe => {
    if (recipe.id) {
        return {
            id: recipe.id,
            energy: recipe.energy,
        };
    }
    return {
        id: `kubejs:imbuement_charge/${recipe.output.split(':')[1]}`,
        energy: recipe.energy,
    };
});

LevelEvents.tick(event => {
    const { level } = event;
    const tickers = level.blockEntityTickers;
    tickers.forEach(ticker => {
        if (ticker.getType() == 'ars_nouveau:imbuement_chamber') {
            let pos = ticker.getPos();
            /**
             * @type {Internal.ImbuementTile}
             */
            let imbuement = level.getBlockEntity(pos);
            let imbuementData = imbuement.getPersistentData();
            let currentRecipe = imbuement.getRecipeNow();
            let belowBlock = level.getBlock(pos.below());

            if (currentRecipe != null) {
                let recipeId = currentRecipe.getId();
                let recipe = recipes.find(r => r.id == recipeId.toString());

                if (recipe == null) {
                    imbuementData.remove('energyConsumed');
                    imbuement.unlockCraftTicks();
                    return;
                }
                if (!belowBlock.hasTag('powah:thermo_generator')) {
                    imbuement.lockCraftTicks();
                    return;
                }

                let energyConsumed = imbuementData.getInt('energyConsumed');

                if (energyConsumed >= recipe.energy) {
                    imbuement.unlockCraftTicks();
                    return;
                }

                /**
                 * @type {Internal.ThermoTile}
                 */
                let thermo = level.getBlockEntity(pos.below());
                let thermoStored = thermo.getEnergy().getStored();

                if (thermoStored > 0) {
                    let max = thermo.getEnergy().getMaxExtract();
                    let toExtract = Math.min(max, recipe.energy - energyConsumed);
                    let actuallyExtracted = thermo.extractEnergy(toExtract, false, Direction.UP);

                    energyConsumed += actuallyExtracted;
                    imbuementData.putInt('energyConsumed', energyConsumed);

                    if (energyConsumed >= recipe.energy) {
                        imbuement.unlockCraftTicks();
                    } else {
                        imbuement.lockCraftTicks();
                    }
                } else {
                    imbuement.lockCraftTicks();
                }
            } else {
                imbuementData.remove('energyConsumed');
                imbuement.unlockCraftTicks();
            }
        }
    });
});
