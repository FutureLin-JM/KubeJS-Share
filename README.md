# KubeJS-Share

分享一些 Minecraft 整合包新手的 KubeJS 项目  
Here are some KubeJS projects for Minecraft modpack beginners.

---

## 中文 (Chinese)

### 流体魔源通道

**代码：**
- [注册方块](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/registry/fluid_sourcelink.js)
- [注册JEI配方](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/fluid_sourcelink.js)

**所需模组：**
[PowerfulJS](https://www.curseforge.com/minecraft/mc-mods/powerfuljs) · [Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau) · [Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)

---

### 新生魔艺灌注室联动Powah热力发电机配方

**代码：**
- [核心代码(LevelEvents.tick事件)](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/tick_event/imbuement_chamber.js)
- [魔改新生魔艺源码](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/hotai/com/hollingsworth/arsnouveau/common/block/tile/ImbuementTile.java)
- [JEI配方注册](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/imbuement_charge.js)
- [配方](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/recipes/imbuement_charge.js)
- [翻译键](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/assets/kubejs/lang/zh_cn.json#L2-L3)

**所需模组：**
[Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau) · [Powah](https://www.curseforge.com/minecraft/mc-mods/powah-rearchitected) · [Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions) · [Hotai](https://www.curseforge.com/minecraft/mc-mods/hotai)

**描述：**

**新增一种特殊配方——灌注合成：灌注充能的配方合成时需要从下方的热力发电机中抽取能量**

通过Hotai对源码的魔改，添加了可供Kubejs调用的控制配方进程的方法，利用LevelEvents.tick事件，在灌注合成时，会检查灌注方块下方的方块，并判断该方块是否为热力发电机，是则从该方块中抽取能量，否则停止灌注。

![灌注充能](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/imbuementCharge.png)

---

### [Create More Recipes](https://www.curseforge.com/minecraft/mc-mods/create-morerecipes) 雪傀儡冷却室兼容Jade

**代码：**
- [Client脚本](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jade_client.js)
- [Startup脚本](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/jade_startup.js)
- [翻译键](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/assets/kubejs/lang/zh_cn.json#L5)

**所需模组：**
[Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)

![Cooled](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/snowman_cooler_cooled.png)
![Frozen](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/snowman_cooler_frozen.png)

---

### 机械动力自定义方块鼓风机配方

**代码：**
- [核心代码(FML通用设置事件、鼓风机类型、配方)](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/ForegeEvent/fan_processing_type.js)
- [JEI配方注册](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/fan_category.js)
- [翻译键](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/assets/kubejs/lang/zh_cn.json#L7-L9)

**所需模组：**
[机械动力](https://www.curseforge.com/minecraft/mc-mods/create) · [Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions) · [AccessTransformerJS](https://www.curseforge.com/minecraft/mc-mods/accesstransformerjs)

**描述：**

**本项目灵感与核心技术来源于 MC 百科社区的优秀教程 [教程一](https://www.mcmod.cn/post/5218.html "[KubeJS]基于 Rhino 和反射实现类 mixin 的效果") 和 [教程二](https://www.mcmod.cn/post/5263.html "[KubeJS Additions]利用 Create 渲染类进行 JEI 配方信息添加") 。在原教程的基础上，我进行了改进和封装，现在可以通过简单的配置，来实现想要的鼓风机类型配方**

**ATJS 配置——`accesstransformer.cfg`文件**
```
public com.simibubi.create.content.kinetics.fan.processing.AllFanProcessingTypes register(Ljava/lang/String;Lcom/simibubi/create/content/kinetics/fan/processing/FanProcessingType;)Lcom/simibubi/create/content/kinetics/fan/processing/FanProcessingType;
```

**配置示例——[`fan_processing_type.js`](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/ForegeEvent/fan_processing_type.js)文件**

在`fan_processing_type.js`中通过JavaScript对象定义配方和处理类型，配置包括输入输出物品、处理媒介、粒子参数等。所有配置通过`global`自动同步至JEI显示。

```js
global.FanRecipes = {
    Honey: [                                                        // 蜂蜜鼓风机类型的配方组（key需与FanTypes对应）
        {
            input: 'minecraft:iron_ingot',                          // 输入物品ID
            output: Item.of('minecraft:iron_sword', '{Damage:1}'),  // 输出物品（可带NBT数据）
            chance: 0.5,                                            // [可选] 处理成功率，0-1 范围（默认1.0）
        },
    ],
    Chocolate: [                                                    // 巧克力鼓风机类型的配方组（key需与FanTypes对应）
        {
            input: 'minecraft:ancient_debris',                      // 输入物品ID
            output: 'minecraft:netherite_ingot',                    // 输出物品ID 或 Item对象
            count: 2,                                               // [可选] 输出数量（默认1）
        },
    ],
};

global.FanTypes = {
    Honey: {                                                        // 蜂蜜鼓风机处理类型定义（key应与FanRecipes对应）
        id: 'honey',                                                // 处理类型的唯一标识
        medium: 'create:honey',                                     // 鼓风机前的"工作媒介"：方块ID 或 流体ID
        particleTypes: [new $DustParticleOptions(                   // [可选] 处理物品时产生的粒子
            new Vector3f(225 / 255, 234 / 255, 60 / 255), 1.5      // RGB 颜色编码（每个值为 0-255 的比例值）
        )],
        airFlowParticle: {                                          // 气流显示效果
            color: 0xe1ea3c,                                        // 气流颜色（RGB 十六进制）
            alpha: 0.75,                                            // 气流透明度（0-1）
            // extraParticle: [                                     // [可选] 额外粒子效果
            //     { type: $ParticleTypes.SNOWFLAKE, chance: 0.04, speed: 0.2 }
            // ],
        },
        affectEntity: (entity, level) => {                          // [可选] 鼓风机对实体的影响（如伤害、药水效果）
            if (!level.clientSide && entity.alive && entity instanceof $LivingEntity) {
                if (entity.age % 20 != 0) return;
                entity.potionEffects.add('minecraft:regeneration', 40);
            }
        },
    },
    Chocolate: {                                                    // 巧克力鼓风机处理类型定义（key应与FanRecipes对应）
        id: 'chocolate',
        medium: 'create:chocolate',
        particleTypes: [new $DustParticleOptions(
            new Vector3f(135 / 255, 56 / 255, 0 / 255), 1.5        // RGB 颜色编码（每个值为 0-255 的比例值）
        )],
        airFlowParticle: {
            color: 0x873800,
            alpha: 0.75,
        },
        // affectEntity 为可选，不写则无特殊效果
    },
};
```

**注意事项**

- 配方**无法热重载**，每次修改配置后需要**重启游戏**才能生效  
- 代码主要针对 **Create 6.0+** 和 **Minecraft 1.20.1 (Forge)** ，其他版本可能需要调整。
- 如果所配置的 medium为完整方块，需要为其添加 `create:fan_transparent`方块标签

---

## English

### Fluid SourceLink

**Code:**
- [Registry Block](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/registry/fluid_sourcelink.js)
- [Registry JEI](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/fluid_sourcelink.js)

**Required Mods:**
[PowerfulJS](https://www.curseforge.com/minecraft/mc-mods/powerfuljs) · [Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau) · [Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)

---

### Ars Nouveau Imbuement Chamber Integration with Powah Thermo Generator Recipe

**Code:**
- [Core Code (LevelEvents.tick)](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/tick_event/imbuement_chamber.js)
- [Modified Ars Nouveau Source Code](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/hotai/com/hollingsworth/arsnouveau/common/block/tile/ImbuementTile.java)
- [Registry JEI](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/imbuement_charge.js)
- [Recipe](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/recipes/imbuement_charge.js)

**Required Mods:**
[Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau) · [Powah](https://www.curseforge.com/minecraft/mc-mods/powah-rearchitected) · [Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions) · [Hotai](https://www.curseforge.com/minecraft/mc-mods/hotai)

**Description:**

**Adds a special recipe type - Imbuement Synthesis: The 'Imbuement Charging' recipe requires drawing energy from a Thermo Generator located below the chamber during synthesis.**

By modifying the source code using Hotai, methods callable by KubeJS for controlling the recipe process were added. Utilizing the LevelEvents.tick event, during imbuement synthesis, the system checks the block below the Imbuement Chamber. If it is a Thermo Generator, energy is drawn from it; otherwise, the imbuement process stops.

![Imbuement Charge](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/imbuementCharge.png)

---

### [Create More Recipes](https://www.curseforge.com/minecraft/mc-mods/create-morerecipes) Snowman Cooler Compatible with Jade

**Code:**
- [Client Script](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jade_client.js)
- [Startup Script](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/jade_startup.js)

**Required Mods:**
[Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)

![Cooled](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/snowman_cooler_cooled.png)
![Frozen](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/snowman_cooler_frozen.png)

---

### Create's Custom Block Fan Processing Recipe

**Code:**
- [Core Code (FML Common Setup Event, Fan Type, Recipes)](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/ForegeEvent/fan_processing_type.js)
- [JEI Recipe Registry](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/imbuement_charge.js)
- [Translation Keys](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/assets/kubejs/lang/zh_cn.json#L7-L9)

**所需模组：**
[Create](https://www.curseforge.com/minecraft/mc-mods/create) · [Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions) · [AccessTransformerJS](https://www.curseforge.com/minecraft/mc-mods/accesstransformerjs)

**Description:**

**This project is inspired by and based on the core technology from MC百科 community's excellent tutorials [Tutorial 1](https://www.mcmod.cn/post/5218.html "[KubeJS]基于 Rhino 和反射实现类 mixin 的效果") 和 [Tutorial 2](https://www.mcmod.cn/post/5263.html "[KubeJS Additions]利用 Create 渲染类进行 JEI 配方信息添加"). Building upon the original tutorials, I have made improvements and encapsulation to achieve custom fan processing recipes through simple configuration.**

**ATJS Configuration - Place in `accesstransformer.cfg`file**
```
public com.simibubi.create.content.kinetics.fan.processing.AllFanProcessingTypes register(Ljava/lang/String;Lcom/simibubi/create/content/kinetics/fan/processing/FanProcessingType;)Lcom/simibubi/create/content/kinetics/fan/processing/FanProcessingType;
```

**Configuration Example - [`fan_processing_type.js`](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/ForegeEvent/fan_processing_type.js)file**

Define recipes and processing types through JavaScript objects in `fan_processing_type.js`. Configurations include input/output items, processing medium, particle parameters, etc. All configurations are automatically synchronized to JEI display through `global`.

```js
global.FanRecipes = {
    Honey: [                                                        // Recipe group for honey fan type (key must match FanTypes)
        {
            input: 'minecraft:iron_ingot',                          // Input item ID
            output: Item.of('minecraft:iron_sword', '{Damage:1}'),  // Output item (can include NBT data)
            chance: 0.5,                                            // [Optional] Processing success rate, 0-1 range (default 1.0)
        },
    ],
    Chocolate: [                                                    // Recipe group for chocolate fan type (key must match FanTypes)
        {
            input: 'minecraft:ancient_debris',                      // Input item ID
            output: 'minecraft:netherite_ingot',                    // Output item ID or Item object
            count: 2,                                               // [Optional] Output quantity (default 1)
        },
    ],
};

global.FanTypes = {
    Honey: {                                                        // Honey fan processing type definition (key should match FanRecipes)
        id: 'honey',                                                // Unique identifier for processing type
        medium: 'create:honey',                                     // "Working medium" in front of fan: block ID or fluid ID
        particleTypes: [new $DustParticleOptions(                   // [Optional] Particles generated during item processing
            new Vector3f(225 / 255, 234 / 255, 60 / 255), 1.5      // RGB color encoding (each value is 0-255 normalized to 0-1)
        )],
        airFlowParticle: {                                          // Airflow visual effects
            color: 0xe1ea3c,                                        // Airflow color (RGB hexadecimal)
            alpha: 0.75,                                            // Airflow transparency (0-1)
            // extraParticle: [                                     // [Optional] Additional particle effects
            //     { type: $ParticleTypes.SNOWFLAKE, chance: 0.04, speed: 0.2 }
            // ],
        },
        affectEntity: (entity, level) => {                          // [Optional] Fan's effect on entities (damage, potion effects, etc.)
            if (!level.clientSide && entity.alive && entity instanceof $LivingEntity) {
                if (entity.age % 20 != 0) return;
                entity.potionEffects.add('minecraft:regeneration', 40);
            }
        },
    },
    Chocolate: {                                                    // Chocolate fan processing type definition (key should match FanRecipes)
        id: 'chocolate',
        medium: 'create:chocolate',
        particleTypes: [new $DustParticleOptions(
            new Vector3f(135 / 255, 56 / 255, 0 / 255), 1.5        // RGB color encoding (each value is 0-255 normalized to 0-1)
        )],
        airFlowParticle: {
            color: 0x873800,
            alpha: 0.75,
        },
        // affectEntity is optional, omit if no special effects needed
    },
};
```

**Important Notes**

- Recipes **cannot be hot-reloaded**, game **restart required**​ after configuration changes  
- Code primarily targets **Create 6.0+**​ and **Minecraft 1.20.1 (Forge)**, other versions may require adjustments
- If the configured medium is a full block, it needs the `create:fan_transparentblock` tag added

---
**Note:** The translation keys used in this project only include the `zh_cn` version. For other languages, please translate and add them yourself.