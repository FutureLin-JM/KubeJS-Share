// priority: 50

global.imbuementChargeRecipes = [
    {
        output: 'powah:steel_energized',
        input: 'powah:charged_snowball',
        pedestalItems: [
            'botania:terrasteel_ingot',
            'botania:elementium_ingot',
            'minecraft:iron_ingot',
            'minecraft:iron_ingot',
            'thermal:invar_ingot',
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            'botania:manasteel_ingot',
        ],
        source: 5000,
        energy: 10000,
    }
];

ServerEvents.recipes(event => {
    const { imbuement } = event.recipes.ars_nouveau;

    global.imbuementChargeRecipes.forEach(recipe => {
        const id = recipe.id ?? `kubejs:imbuement_charge/${recipe.output.split(':')[1]}`;
        // 此处的imbuement是我自己注册的，如果使用的是Kubejs Ars Nouveau，请按照提示的参量顺序填写
        imbuement(recipe.output, recipe.input, recipe.source, recipe.pedestalItems).id(id);
    });
});
