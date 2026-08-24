"""RAZ Level L Lesson Plans Part 5: Lessons 9-10."""

LESSONS = []

# ===== 9. FANTASTIC FLYING MACHINES =====
LESSONS.append({
    "title_en": "Fantastic Flying Machines",
    "word_count": 457,
    "topic": "人类飞行器的历史与种类",
    "objectives": {
        "knowledge": [
            "掌握propeller, helicopter, glider, jet engine, rotor 等飞行器词汇",
            "理解thanks to, take off, fight fires 等短语",
            "学习一般现在时被动语态描述机械构造",
        ],
        "process": [
            "通过视频激活飞行器相关背景",
            "借助时间轴梳理人类飞行史",
            "小组合作完成飞行器分类表，培养归纳能力",
        ],
        "emotions": [
            "感受人类探索飞行的勇气与智慧",
            "培养对航空航天的兴趣",
        ],
    },
    "key_points": [
        "飞行器词汇 (propeller, helicopter, glider, jet engine, rotor)",
        "一般现在时被动语态描述机械",
        "情态动词 can 表能力",
    ],
    "difficult_points": [
        "飞行器专有名词较多",
        "被动语态在科技文中的使用",
    ],
    "methods": ["图片环游", "时间轴梳理", "任务型阅读"],
    "preparation": ["飞行器图片视频", "时间轴", "生词卡"],
    "process": [
        {"name": "Lead-in（导入）", "duration": "5分钟",
         "teacher": "播放飞机起飞视频，提问Imagine if you could fly like a bird. Where would you go?",
         "students": "观看并讨论。",
         "purpose": "激活背景，引入主题。"},
        {"name": "Pre-reading（读前）", "duration": "5分钟",
         "teacher": "出示目录和各类飞行器图片（气球、滑翔机、飞机、直升机、飞艇、火箭），带读生词卡。",
         "students": "看图认物，跟读生词。",
         "purpose": "扫除生词障碍。"},
        {"name": "While-reading（读中）", "duration": "18分钟",
         "teacher": "1. 分段阅读；2. 飞行器分类任务（按飞行原理/速度/用途）；3. 重点讲解thanks to, take off等短语。",
         "students": "分段阅读并完成分类表；小组讨论。",
         "purpose": "训练阅读，落实词汇与句型。"},
        {"name": "Post-reading（读后）", "duration": "10分钟",
         "teacher": "1. Discussion：Which flying machine impresses you most? Why? 2. 设计你自己的飞行器。",
         "students": "讨论；设计汇报。",
         "purpose": "内化语言，培养创造能力。"},
        {"name": "Summary & Homework（小结与作业）", "duration": "2分钟",
         "teacher": "总结生词与被动结构，布置作业。",
         "students": "记录作业。",
         "purpose": "巩固。"},
    ],
    "blackboard": (
        "Fantastic Flying Machines\n"
        "Airplane (propeller / jet engine) - fly high & fast\n"
        "Helicopter (rotor) - land anywhere\n"
        "Blimp / Hot-air Balloon - soft & slow\n"
        "Rocket - go to space\n"
        "★ thanks to + 名词 = 多亏了…\n"
        "★ take off = 起飞"
    ),
    "homework": [
        "必做：抄写12个重点词汇并造句。",
        "选做：选一种飞行器做一张英文小海报。",
        "拓展：阅读莱特兄弟(Wright brothers)的英文故事，记录关键事件。",
    ],
    "vocabulary": [
        {"word": "propeller", "ipa": "/prəˈpelər/", "pos": "n.", "meaning_zh": "螺旋桨",
         "meaning_en": "a device with blades that spin round to make an aircraft or ship move"},
        {"word": "helicopter", "ipa": "/ˈhelɪkɑːptər/", "pos": "n.", "meaning_zh": "直升机",
         "meaning_en": "an aircraft with long blades on top that spin and allow it to land and take off vertically"},
        {"word": "glider", "ipa": "/ˈɡlaɪdər/", "pos": "n.", "meaning_zh": "滑翔机",
         "meaning_en": "an aircraft without an engine that flies on air currents"},
        {"word": "jet engine", "ipa": "/dʒet ˈendʒɪn/", "pos": "n.", "meaning_zh": "喷气发动机",
         "meaning_en": "an engine that produces thrust by forcing hot gases out the back"},
        {"word": "rotor", "ipa": "/ˈroʊtər/", "pos": "n.", "meaning_zh": "旋翼",
         "meaning_en": "the part of a helicopter that spins round on top"},
        {"word": "blimp", "ipa": "/blɪmp/", "pos": "n.", "meaning_zh": "软式飞艇",
         "meaning_en": "a large aircraft without wings that floats in the air filled with gas"},
        {"word": "balloon", "ipa": "/bəˈluːn/", "pos": "n.", "meaning_zh": "气球",
         "meaning_en": "a bag filled with hot air or gas that can float in the sky"},
        {"word": "rocket", "ipa": "/ˈrɑːkɪt/", "pos": "n.", "meaning_zh": "火箭",
         "meaning_en": "a vehicle shaped like a tube that is powered by gases and can travel into space"},
        {"word": "shuttle", "ipa": "/ˈʃʌtəl/", "pos": "n.", "meaning_zh": "航天飞机",
         "meaning_en": "a spacecraft that travels between Earth and space, often several times"},
        {"word": "cargo", "ipa": "/ˈkɑːrɡoʊ/", "pos": "n.", "meaning_zh": "货物",
         "meaning_en": "goods carried by a ship, plane or truck"},
        {"word": "ambulance", "ipa": "/ˈæmbjələns/", "pos": "n.", "meaning_zh": "救护车（机）",
         "meaning_en": "a vehicle used for taking sick or injured people to hospital"},
        {"word": "astronaut", "ipa": "/ˈæstrənɔːt/", "pos": "n.", "meaning_zh": "宇航员",
         "meaning_en": "a person who travels into space"},
    ],
    "phrases": [
        {"phrase": "thanks to", "meaning_zh": "多亏了",
         "usage": "介词短语，表原因",
         "example": "Today, many people can fly thanks to fantastic flying machines."},
        {"phrase": "take off", "meaning_zh": "起飞",
         "usage": "动词短语，飞机起飞",
         "example": "A Navy jet fighter takes off from an aircraft carrier."},
        {"phrase": "force ... out the back", "meaning_zh": "把…从后部喷出",
         "usage": "动词短语，强调喷射",
         "example": "Rocket engines force hot air and gas out the back to create thrust."},
        {"phrase": "carry ... around the world", "meaning_zh": "环游世界运送",
         "usage": "强调远距离运输",
         "example": "Cargo planes and mail planes fly around the world."},
        {"phrase": "land on", "meaning_zh": "降落在",
         "usage": "动词短语",
         "example": "Helicopters can land almost anywhere."},
        {"phrase": "drift on air", "meaning_zh": "在空中飘荡",
         "usage": "动词短语，缓慢移动",
         "example": "Now, hang gliders drift on air."},
    ],
    "grammar": [
        {"point": "一般现在时被动语态",
         "explanation": "结构：主语+am/is/are+过去分词。科技说明文描述物体构造和工作原理时常用。",
         "examples": [
            "Hot-air balloons are pushed by the wind.",
            "Pilots steer them where they want to go.",
            "A jet engine forces hot gases in a stream behind it.",
         ]},
        {"point": "情态动词 can + 动词原形",
         "explanation": "can表能力或可能性，后接动词原形。否定形式cannot / can't。",
         "examples": [
            "Helicopters can land almost anywhere.",
            "They can also fly backward and sideways.",
            "They can even stop in midair!",
         ]},
        {"point": "一般现在时表客观事实",
         "explanation": "描述普遍真理、自然规律或机器性能时用一般现在时。",
         "examples": [
            "Hot-air balloons are pushed by the wind.",
            "Powerful rockets work like big engines.",
        ]},
    ],
})

# ===== 10. GHOST TOWNS =====
LESSONS.append({
    "title_en": "Ghost Towns",
    "word_count": 478,
    "topic": "世界各地的鬼城及其成因",
    "objectives": {
        "knowledge": [
            "掌握diamond, erupt, landslide, radiation, resource 等生词",
            "理解run out of, be caused by, be full of 等短语",
         "学习一般过去时与现在完成时描述事件",
        ],
        "process": [
            "通过图片激活'鬼城'概念",
            "借助地图定位世界各地鬼城",
            "小组讨论鬼城的成因，培养分析能力",
        ],
        "emotions": [
            "了解自然力量对人类的影响",
            "培养环境保护与防灾意识",
        ],
    },
    "key_points": [
        "环境与灾难词汇 (erupted, landslides, radiation, volcano, earthquake)",
        "run out of / be full of 短语",
        "一般过去时被动语态描述历史事件",
    ],
    "difficult_points": [
        "自然灾害相关词汇与背景",
        "现在完成时在描述持续影响时的使用",
    ],
    "methods": ["图片环游", "地图定位", "小组合作"],
    "preparation": ["鬼城图片", "世界地图", "生词卡"],
    "process": [
        {"name": "Lead-in（导入）", "duration": "5分钟",
         "teacher": "展示世界各地鬼城图片，提问What is a ghost town? Why would people leave?",
         "students": "看图讨论。",
         "purpose": "激活背景，引入主题。"},
        {"name": "Pre-reading（读前）", "duration": "5分钟",
         "teacher": "在世界地图上标注几座典型鬼城（Kolmanskop, Plymouth, Pripyat, Centralia, Ordos）；带读生词卡。",
         "students": "看地图定位，跟读生词。",
         "purpose": "建立地理与背景知识。"},
        {"name": "While-reading（读中）", "duration": "18分钟",
         "teacher": "1. 分段阅读；2. 完成鬼城成因分类表（资源耗尽/自然灾害/事故/生存艰难）；3. 重点讲解erupt, landslide等词。",
         "students": "分段阅读并填写分类表；小组讨论。",
         "purpose": "训练信息分类，落实词汇。"},
        {"name": "Post-reading（读后）", "duration": "10分钟",
         "teacher": "1. Discussion：What will our cities look like in 1000 years? 2. 角色扮演：你是最后一个离开鬼城的人。",
         "students": "讨论；角色扮演。",
         "purpose": "内化语言，培养想象力与环保意识。"},
        {"name": "Summary & Homework（小结与作业）", "duration": "2分钟",
         "teacher": "总结生词与时态，布置作业。",
         "students": "记录作业。",
         "purpose": "巩固。"},
    ],
    "blackboard": (
        "Ghost Towns\n"
        "Why people leave:\n"
        " 1) Resources run out (Kolmanskop)\n"
        " 2) Forces of nature (Plymouth)\n"
        " 3) Deadly land (Centralia)\n"
        " 4) Hard way of life (St. Kilda)\n"
        "★ run out of = 用完\n"
        "★ be caused by = 由…引起"
    ),
    "homework": [
        "必做：抄写12个重点词汇并造句。",
        "选做：选一座鬼城做一张英文海报。",
        "拓展：选择一个中国'空心村'现象，用英文简单介绍。",
    ],
    "vocabulary": [
        {"word": "diamond", "ipa": "/ˈdaɪmənd/", "pos": "n.", "meaning_zh": "钻石",
         "meaning_en": "a very hard precious stone, used in jewellery"},
        {"word": "erupt", "ipa": "/iˈrʌpt/", "pos": "v.", "meaning_zh": "（火山）喷发",
         "meaning_en": "to throw out rock, lava and ash from a volcano"},
        {"word": "landslide", "ipa": "/ˈlændslaɪd/", "pos": "n.", "meaning_zh": "山体滑坡；塌方",
         "meaning_en": "a mass of earth or rock that falls down the side of a mountain"},
        {"word": "radiation", "ipa": "/ˌreɪdiˈeɪʃən/", "pos": "n.", "meaning_zh": "辐射",
         "meaning_en": "a dangerous and powerful form of energy that comes from nuclear reactions"},
        {"word": "resource", "ipa": "/ˈriːsɔːrs/", "pos": "n.", "meaning_zh": "资源",
         "meaning_en": "a supply of something valuable or useful"},
        {"word": "nuclear", "ipa": "/ˈnuːkliər/", "pos": "adj.", "meaning_zh": "核的",
         "meaning_en": "relating to the energy produced by splitting atoms"},
        {"word": "volcano", "ipa": "/vɑːlˈkeɪnoʊ/", "pos": "n.", "meaning_zh": "火山",
         "meaning_en": "a mountain with a hole at the top through which hot liquid rock comes out"},
        {"word": "earthquake", "ipa": "/ˈɜːrθkweɪk/", "pos": "n.", "meaning_zh": "地震",
         "meaning_en": "a sudden shaking of the ground caused by movements under the earth's surface"},
        {"word": "deserted", "ipa": "/dɪˈzɜːrtɪd/", "pos": "adj.", "meaning_zh": "荒废的；空无一人的",
         "meaning_en": "empty and quiet because everyone has left"},
        {"word": "disaster", "ipa": "/dɪˈzæstər/", "pos": "n.", "meaning_zh": "灾难",
         "meaning_en": "a sudden event that causes great damage or loss of life"},
        {"word": "wildlife", "ipa": "/ˈwaɪldlaɪf/", "pos": "n.", "meaning_zh": "野生动物",
         "meaning_en": "animals and plants that live in natural conditions"},
        {"word": "balance", "ipa": "/ˈbæləns/", "pos": "n.", "meaning_zh": "平衡",
         "meaning_en": "a state where things are of equal weight or importance"},
    ],
    "phrases": [
        {"phrase": "run out of", "meaning_zh": "用完；耗尽",
         "usage": "动词短语，强调资源耗尽",
         "example": "Sometimes people leave a town after they run out of a resource."},
        {"phrase": "be caused by", "meaning_zh": "由…引起",
         "usage": "被动语态，强调原因",
         "example": "Some places become ghost towns because of natural events."},
        {"phrase": "be full of", "meaning_zh": "充满",
         "usage": "形容词短语",
         "example": "Old buildings and boats are still there."},
        {"phrase": "be hard to get to", "meaning_zh": "难以到达",
         "usage": "形容词短语作表语",
         "example": "People leave some places because they are too hard to get to."},
        {"phrase": "head east", "meaning_zh": "向东去",
         "usage": "动词短语，表方向",
         "example": "It then travels quickly across the American plains, and heads east."},
        {"phrase": "with secrets to share", "meaning_zh": "有秘密可分享",
         "usage": "介词短语，强调神秘感",
         "example": "They are lonely places with secrets to share."},
    ],
    "grammar": [
        {"point": "一般过去时被动语态",
         "explanation": "结构：主语+was/were+过去分词(+by sb.)。描述过去发生的动作及其承受者。",
         "examples": [
            "In 1908, a diamond was found in a desert in Africa.",
            "Whales became harder to find over time.",
            "A fire spread into the old mines below the dump.",
         ]},
        {"point": "现在完成时 (has/have + 过去分词)",
         "explanation": "表示过去发生并与现在有联系的动作或状态。文中表示持续到现在的影响。",
         "examples": [
            "Chernobyl Nuclear Power Plant's workers and their families have left the city.",
            "People have lived in these places for thousands of years.",
        ]},
        {"point": "because / because of 引导原因",
         "explanation": "because后接句子；because of后接名词或动名词。",
         "examples": [
            "Some places become ghost towns because of natural events.",
            "People leave some places because they are too hard to get to.",
        ]},
    ],
})
