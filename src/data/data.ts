export interface Note {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    images: string[];
    comments: Comment[];
    opinion: string;
}

export interface Comment {
    comment: string;
    opinion: string;
}

export const testNotes = [
    {
        note_id: "1",
        title: "探索大自然的奥秘",
        tag_list: "自然,探索,摄影",
        desc: "今天我们去探索了一片原始森林，发现了许多奇特的植物和动物。这里的生态系统非常丰富，让我们对大自然有了更深的认识。",
        image_list: "https://picsum.photos/800/600?random=1,https://picsum.photos/800/600?random=2,https://picsum.photos/800/600?random=3",
        comments: [
            "这些照片拍得真美，完全展现了大自然的壮丽！",
            "我也去过那里，确实很震撼。",
            "请问具体位置在哪里？我也想去看看。",
            "这些植物看起来好特别，是什么品种？",
            "建议早上或者傍晚去，光线会更好。",
            "需要准备什么装备吗？",
            "那里有住宿的地方吗？",
            "这些照片是用什么相机拍的？"
        ]
    },
    {
        note_id: "2",
        title: "城市美食探索之旅",
        tag_list: "美食,城市,探店",
        desc: "周末和朋友一起探索了城市里的美食，发现了很多隐藏的美食宝藏。从街边小吃到米其林餐厅，每一家都让人印象深刻。",
        image_list: "https://picsum.photos/800/600?random=4,https://picsum.photos/800/600?random=5",
        comments: [
            "这家店我也去过，确实不错！",
            "看起来好好吃，下次一定要去试试。",
            "价格怎么样？",
            "营业时间是几点到几点？",
            "需要提前预约吗？",
            "停车方便吗？",
            "有推荐的必点菜吗？",
            "服务态度如何？",
            "环境怎么样？"
        ]
    },
    {
        note_id: "3",
        title: "科技改变生活",
        tag_list: "科技,生活,创新",
        desc: "最近体验了一些最新的科技产品，从智能家居到可穿戴设备，科技正在深刻地改变着我们的生活方式。",
        image_list: "https://picsum.photos/800/600?random=6,https://picsum.photos/800/600?random=7,https://picsum.photos/800/600?random=8",
        comments: [
            "这些产品确实很方便，但价格有点贵。",
            "电池续航怎么样？",
            "使用起来复杂吗？",
            "需要联网吗？",
            "数据安全有保障吗？",
            "售后服务如何？",
            "有中文界面吗？",
            "可以和其他设备联动吗？"
        ]
    },
    {
        note_id: "4",
        title: "旅行日记：海边度假",
        tag_list: "旅行,度假,海边",
        desc: "在美丽的海边度过了难忘的一周，每天听着海浪声醒来，看着日落入睡，生活节奏慢了下来，心情也变得平静。",
        image_list: "https://picsum.photos/800/600?random=9,https://picsum.photos/800/600?random=10",
        comments: [
            "好想去海边度假啊！",
            "这是哪个海滩？",
            "住宿条件如何？",
            "海水清澈吗？",
            "适合游泳吗？",
            "有水上项目吗？",
            "附近有什么景点？",
            "消费水平如何？",
            "交通方便吗？"
        ]
    },
    {
        note_id: "5",
        title: "艺术展览回顾",
        tag_list: "艺术,展览,文化",
        desc: "参观了最新的当代艺术展览，展品充满创意和想象力，让人对艺术有了新的认识。",
        image_list: "https://picsum.photos/800/600?random=11,https://picsum.photos/800/600?random=12,https://picsum.photos/800/600?random=13",
        comments: [
            "这些作品很有深度。",
            "展览持续到什么时候？",
            "门票多少钱？",
            "可以拍照吗？",
            "有导览服务吗？",
            "停车方便吗？",
            "有纪念品商店吗？",
            "需要提前预约吗？"
        ]
    },
    {
        note_id: "6",
        title: "运动健身日记",
        tag_list: "运动,健身,健康",
        desc: "开始坚持每天运动，从简单的跑步到力量训练，感觉身体状态越来越好，心情也更加愉悦。",
        image_list: "https://picsum.photos/800/600?random=14,https://picsum.photos/800/600?random=15",
        comments: [
            "运动确实能让人心情变好。",
            "每天运动多长时间？",
            "有推荐的健身计划吗？",
            "需要注意什么？",
            "饮食方面有什么建议？",
            "运动后如何放松？",
            "有适合新手的动作吗？",
            "需要请教练吗？"
        ]
    },
    {
        note_id: "7",
        title: "读书笔记：科幻小说",
        tag_list: "读书,科幻,文学",
        desc: "最近读了一本精彩的科幻小说，故事情节扣人心弦，对未来世界的想象令人深思。",
        image_list: "https://picsum.photos/800/600?random=16,https://picsum.photos/800/600?random=17",
        comments: [
            "这本书我也看过，确实不错！",
            "结局怎么样？",
            "适合初学者吗？",
            "有续集吗？",
            "书评写得很好。",
            "在哪里买的？",
            "有电子版吗？",
            "作者还有其他作品吗？"
        ]
    },
    {
        note_id: "8",
        title: "音乐现场回顾",
        tag_list: "音乐,现场,娱乐",
        desc: "昨晚去看了期待已久的演唱会，现场氛围超棒，歌手表现完美，是一次难忘的音乐体验。",
        image_list: "https://picsum.photos/800/600?random=18,https://picsum.photos/800/600?random=19",
        comments: [
            "现场气氛一定很棒！",
            "门票多少钱？",
            "音响效果如何？",
            "有安可吗？",
            "场馆大吗？",
            "停车方便吗？",
            "有周边卖吗？",
            "需要提前多久到？"
        ]
    },
    {
        note_id: "9",
        title: "手工DIY教程",
        tag_list: "手工,DIY,创意",
        desc: "分享一个简单有趣的手工DIY教程，材料容易准备，成品也很实用，适合周末在家尝试。",
        image_list: "https://picsum.photos/800/600?random=20,https://picsum.photos/800/600?random=21",
        comments: [
            "看起来很有趣！",
            "材料在哪里买？",
            "需要什么工具？",
            "适合新手吗？",
            "大概需要多长时间？",
            "有视频教程吗？",
            "成品耐用吗？",
            "可以定制颜色吗？"
        ]
    },
    {
        note_id: "10",
        title: "宠物日常",
        tag_list: "宠物,生活,萌宠",
        desc: "记录我家小猫咪的日常生活，从玩耍到睡觉，每一个瞬间都让人感到温暖。",
        image_list: "https://picsum.photos/800/600?random=22,https://picsum.photos/800/600?random=23",
        comments: [
            "好可爱的小猫咪！",
            "是什么品种？",
            "多大了？",
            "平时吃什么？",
            "需要经常洗澡吗？",
            "会抓家具吗？",
            "有定期体检吗？",
            "性格怎么样？"
        ]
    }
];