const $DoubleItemIcon = Java.loadClass('com.simibubi.create.compat.jei.DoubleItemIcon');
const $CreateRecipeCategory = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory');
const $AllGuiTextures = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures');
const $AnimatedKinetics = Java.loadClass('com.simibubi.create.compat.jei.category.animations.AnimatedKinetics');
const $AllPartialModels = Java.loadClass('com.simibubi.create.AllPartialModels');

JEIAddedEvents.registerCategories(event => {
    event.custom('kubejs:fan_custom', category => {
        const { guiHelper } = category.jeiHelpers;

        category
            .title(Text.translate('jei.kubejs.fan_custom'))
            .background(guiHelper.createBlankDrawable(0, 0))
            .setWidth(178)
            .setHeight(72)
            .iconSupplier(() => {
                return new $DoubleItemIcon(
                    () => Item.of('create:propeller'),
                    () => Item.of('minecraft:diamond'),
                );
            })
            .handleLookup((builder, recipe, focuses) => {
                builder
                    .addSlot('INPUT', 21, 48)
                    .setBackground($CreateRecipeCategory.getRenderedSlot(), -1, -1)
                    .addIngredients(recipe.data.input);
                let outputSlotBackground;
                if (recipe.data.chance && recipe.data.chance < 1) {
                    outputSlotBackground = $CreateRecipeCategory.getRenderedSlot(recipe.data.chance);
                } else {
                    outputSlotBackground = $CreateRecipeCategory.getRenderedSlot();
                }
                builder
                    .addSlot('OUTPUT', 141, 48)
                    .setBackground(outputSlotBackground, -1, -1)
                    .addRichTooltipCallback((recipeSlotView, tooltip) => {
                        if (recipe.data.chance && recipe.data.chance < 1) {
                            let chanceText =
                                recipe.data.chance < 0.01
                                    ? '<1'
                                    : String(parseFloat((recipe.data.chance * 100).toFixed(1)));
                            tooltip.add(Text.translate('create.recipe.processing.chance', chanceText).gold());
                        } else {
                            return;
                        }
                    })
                    .addItemStack(recipe.data.output);
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                $AllGuiTextures.JEI_SHADOW.render(guiGraphics, 46, 29);
                $AllGuiTextures.JEI_SHADOW.render(guiGraphics, 65, 39);
                $AllGuiTextures.JEI_LONG_ARROW.render(guiGraphics, 54, 51);

                let matrixStack = guiGraphics.pose();

                matrixStack.pushPose();
                matrixStack.translate(56, 33, 0);
                matrixStack.mulPose($Axis.XP.rotationDegrees(-12.5));
                matrixStack.mulPose($Axis.YP.rotationDegrees(22.5));

                $AnimatedKinetics['defaultBlockElement(dev.engine_room.flywheel.lib.model.baked.PartialModel)'](
                    $AllPartialModels.ENCASED_FAN_INNER,
                )
                    .rotateBlock(180, 0, $AnimatedKinetics.getCurrentAngle() * 16)
                    .scale(24.0)
                    .render(guiGraphics);

                $AnimatedKinetics
                    .defaultBlockElement(Block.getBlock('create:encased_fan').defaultBlockState())
                    .rotateBlock(0, 180, 0)
                    .atLocal(0.0, 0.0, 0.0)
                    .scale(24.0)
                    .render(guiGraphics);

                let catalystBlock = Block.getBlock(recipe.data.category).defaultBlockState();
                $AnimatedKinetics
                    .defaultBlockElement(catalystBlock)
                    .rotateBlock(0, 180, 0)
                    .atLocal(0.0, 0.0, 2.0)
                    .scale(24.0)
                    .render(guiGraphics);

                matrixStack.popPose();
            })
            .setTooltipHandlerOverride((tooltip, recipe, recipeSlotView, mouseX, mouseY) => {
                // Use a hex-like hit area derived from measured corners to match the 3D catalyst block
                const poly = [
                    { x: 105, y: 45 },
                    { x: 105, y: 22 },
                    { x: 96, y: 17 },
                    { x: 75, y: 20 },
                    { x: 75, y: 42 },
                    { x: 84, y: 47 },
                ];

                const pointInPoly = (pt, vertices) => {
                    let inside = false;
                    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
                        let xi = vertices[i].x,
                            yi = vertices[i].y;
                        let xj = vertices[j].x,
                            yj = vertices[j].y;
                        let intersect = yi > pt.y !== yj > pt.y && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi;
                        if (intersect) inside = !inside;
                    }
                    return inside;
                };

                if (pointInPoly({ x: mouseX, y: mouseY }, poly)) {
                    let blockName = Block.getBlock(recipe.data.category).getName();
                    tooltip.add(
                        Text.translate('jei.desc.kubejs.fan_custom.category_block').gray().append(blockName.white()),
                    );
                }
            });
    });
});

JEIAddedEvents.registerRecipes(event => {
    if (!global.FanRecipes || !global.FanTypes) return;

    Object.keys(global.FanRecipes).forEach(typeName => {
        const recipes = global.FanRecipes[typeName];
        const fanType = global.FanTypes[typeName];

        if (!recipes || !fanType) return;

        recipes.forEach(recipe => {
            let output = recipe.output;
            if (recipe.count && recipe.count > 1) {
                output = Item.of(recipe.output).withCount(recipe.count);
            }

            event.custom('kubejs:fan_custom').add({
                input: recipe.input,
                output: output,
                chance: recipe.chance,
                category: fanType.medium,
            });
        });
    });
});

JEIAddedEvents.registerRecipeCatalysts(event => {
    event.data['addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'](
        Item.of('create:encased_fan').setHoverName(Text.translate('jei.desc.kubejs.fan_custom.fan')),
        'kubejs:fan_custom',
    );
});
