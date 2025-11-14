# KubeJS-Share
分享一些Minecraft整合包新手的Kubejs项目

### 流体魔源通道
* [[注册方块](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/registry/fluid_sourcelink.js)、[注册JEI配方](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/fluid_sourcelink.js)]  
所需模组：[PowerfulJS](https://www.curseforge.com/minecraft/mc-mods/powerfuljs)、[Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau)、[Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)

### 新生魔艺灌注室联动Powah热力发电机配方
* [[核心代码(LevelEvents.tick事件)](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/tick_event/imbuement_chamber.js)、[魔改新生魔艺源码](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/hotai/com/hollingsworth/arsnouveau/common/block/tile/ImbuementTile.java)、[注册JEI配方](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/imbuement_charge.js)、[配方](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/recipes/imbuement_charge.js)]  
所需模组：[Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau)、[Powah](https://www.curseforge.com/minecraft/mc-mods/powah-rearchitected)、[Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)、[Hotai](https://www.curseforge.com/minecraft/mc-mods/hotai)
* 描述：  
  **新增一种特殊配方——灌注合成：灌注充能的配方合成时需要从下方的热力发电机中抽取能量**  
  通过Hotai对源码的魔改，添加了可供Kubejs调用的控制配方进程的方法，利用LevelEvents.tick事件，在灌注合成时，会检查灌注方块下方的方块，并判断该方块是否为热力发电机，是则从该方块中抽取能量，否则停止灌注。  
  **注：该项目使用的相应翻译键值未提供，请自行添加。**  
![灌注充能](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/images/imbuementCharge.png)

Here are some Kubejs projects for Minecraft modpack beginner.

### Fluid SourceLink
* [[Registry Block](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/startup_scripts/registry/fluid_sourcelink.js)、[Registry JEI](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/fluid_sourcelink.js)]  
Required mods：[PowerfulJS](https://www.curseforge.com/minecraft/mc-mods/powerfuljs)、[Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau)、[Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)

### Ars Nouveau Imbuement Chamber Integration with Powah Thermo Generator Recipe
* [[Core Code (LevelEvents.tick)](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/tick_event/imbuement_chamber.js)、[Modified Ars Nouveau Source Code](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/hotai/com/hollingsworth/arsnouveau/common/block/tile/ImbuementTile.java)、[Registry JEI](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/client_scripts/jei/imbuement_charge.js)、[Recipe](https://github.com/FutureLin-JM/KubeJS-Share/blob/main/kubejs/server_scripts/recipes/imbuement_charge.js)]  
Required mods：[Ars Nouveau](https://www.curseforge.com/minecraft/mc-mods/ars-nouveau)、[Powah](https://www.curseforge.com/minecraft/mc-mods/powah-rearchitected)、[Kubejs Additions](https://www.curseforge.com/minecraft/mc-mods/kubejs-additions)、[Hotai](https://www.curseforge.com/minecraft/mc-mods/hotai)
* Description:  
  **Adds a special recipe type - Imbuement Synthesis: The 'Imbuement Charging' recipe requires drawing energy from a Thermo Generator located below the chamber during synthesis.**  
By modifying the source code using Hotai, methods callable by KubeJS for controlling the recipe process were added. Utilizing the LevelEvents.tick event, during imbuement synthesis, the system checks the block below the Imbuement Chamber. If it is a Thermo Generator, energy is drawn from it; otherwise, the imbuement process stops.  
**Note: The corresponding translation key values used in this project are not provided. Please add them by yourself.**