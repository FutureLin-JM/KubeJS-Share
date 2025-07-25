// 注册配方类型
JEIAddedEvents.registerCategories(event => {
    event.custom('kubejs:fluid_sourcelink', category => {
        const { guiHelper } = category.jeiHelpers

        category
            .title('Fluid SourceLink')
            .background(null)
            .setWidth(105)
            .setHeight(40)
            .icon(guiHelper.createDrawableItemStack('kubejs:fluid_sourcelink'))
            .handleLookup((builder, recipe, focuses) => {
                builder.addSlot('INPUT', 16, 12)
                    .addFluidStack(recipe.data.input, 1000)
                    .setFluidRenderer(1000, false, 16, 16);
                builder.addInvisibleIngredients('OUTPUT').addItemStack('kubejs:fluid_sourcelink');
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                let sourceText = Text.translate('%s Source', recipe.data.source.toFixed(0))
                guiGraphics.drawWordWrap(Client.font, sourceText, 40, 16, 65, 0)
            })
    })
});

// 注册配方
JEIAddedEvents.registerRecipes(event => {
    event
        .custom('kubejs:fluid_sourcelink')
        .add({input: 'minecraft:lava', source: 500})
});

// 将流体魔源通道添加该配方JEI下
JEIAddedEvents.registerRecipeCatalysts((event) => {
    const catalysts = [
        ['kubejs:fluid_sourcelink', 'kubejs:fluid_sourcelink'],

    ];

    catalysts.forEach(([input, recipe]) => {
        event.data['addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'](
            input,
            recipe
        );
    });
});