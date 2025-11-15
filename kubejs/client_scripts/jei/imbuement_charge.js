JEIAddedEvents.registerCategories(event => {
    event.custom('kubejs:imbuement_charge', category => {
        const { guiHelper } = category.jeiHelpers;
        category
            .title(Text.translatable('jei.kubejs.imbuement_charge'))
            .background(null)
            .setWidth(114)
            .setHeight(108)
            .icon(guiHelper.createDrawableItemStack('ars_nouveau:imbuement_chamber'))
            .handleLookup((builder, recipe, focuses) => {
                // 中心
                builder.addSlot('INPUT', 48, 45).addItemStack(recipe.data.input);
                circularLayout(builder, recipe);
                builder.addSlot('OUTPUT', 86, 10).addItemStack(recipe.data.output);
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                let sourceText = Text.translate('ars_nouveau.source', recipe.data.source.toFixed(0));
                let energyText = Text.translate(
                    'jei.desc.kubejs.imbuement_charge.energy',
                    numFormat(recipe.data.energy)
                );
                guiGraphics.drawWordWrap(Client.font, sourceText, 0, 100, 100, 0);
                guiGraphics.drawWordWrap(Client.font, energyText, 0, 0, 114, 0);
            });
    });
});

JEIAddedEvents.registerRecipes(event => {
    global.imbuementChargeRecipes.forEach(recipe => {
        event.custom('kubejs:imbuement_charge').add({
            output: recipe.output,
            input: recipe.input,
            pedestalItems: recipe.pedestalItems,
            source: recipe.source,
            energy: recipe.energy,
        });
    });
});

// 移除原有配方，避免重复显示
JEIEvents.removeRecipes((event) => {
    global.imbuementChargeRecipes.forEach(recipe => {
        const id = recipe.id ?? `kubejs:imbuement_charge/${recipe.output.split(':')[1]}`
        event.remove('ars_nouveau:imbuement', [id])
    })
});

// 将灌注室、热力发电机添加该配方JEI下
JEIAddedEvents.registerRecipeCatalysts(event => {
    const catalysts = [
        ['ars_nouveau:imbuement_chamber', 'kubejs:imbuement_charge'],
    ];

    catalysts.forEach(([input, recipe]) => {
        event.data['addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'](
            input,
            recipe
        );
    });

    Ingredient.of(/powah:thermo_generator_.*/).itemIds.forEach(input => {
        event.data['addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'](
            input,
            'kubejs:imbuement_charge'
        );
    });
});

/**
 * 按圆形布局添加配方输入槽位
 * @param {Internal.IRecipeLayoutBuilder} builder JEI配方布局构建器
 * @param {Internal.CustomJSRecipe} recipe 自定义JS配方对象
 */
function circularLayout(builder, recipe) {
    /**
     * @type {Internal.ItemStack[]}
     */
    const inputs = recipe.data.pedestalItems;
    if (inputs.length === 0) return;

    const angleBetweenEach = 360.0 / inputs.length;
    const center = { x: 48, y: 45 };
    let point = { x: 48, y: 13 };

    inputs.forEach(input => {
        builder.addSlot('INPUT', point.x, point.y).addItemStack(input);
        point = rotatePointAbout(point, center, angleBetweenEach);
    });
}

/**
 * 将一个点绕着中心点旋转指定角度
 * @param {{x: number, y: number}} point 需要旋转的点坐标
 * @param {{x: number, y: number}} center 旋转中心点坐标
 * @param {number} degrees 旋转角度（度数）
 * @returns {{x: number, y: number}} 旋转后的点坐标
 */
function rotatePointAbout(point, center, degrees) {
    const rad = (degrees * KMath.PI) / 180.0;

    return {
        x: center.x + (point.x - center.x) * Math.cos(rad) - (point.y - center.y) * Math.sin(rad),
        y: center.y + (point.x - center.x) * Math.sin(rad) + (point.y - center.y) * Math.cos(rad),
    };
}


/**
 * 格式化数字，为整数部分添加千位分隔符
 * @param {number} num - 需要格式化的数字
 * @returns {string} 添加了千位分隔符的数字字符串
 */
function numFormat(num){
  var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
       // 为整数部分添加千位分隔符
       return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
          return $1+",";
        });
  })
  return res;
}
