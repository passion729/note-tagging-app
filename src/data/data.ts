export const testNotes = [
    {
        id: 1,
        title: "这是一条非常长的标题，用来测试标题栏的布局是否正常，以及是否能够正确换行和显示省略号",
        content: "这是一条非常长的内容，用来测试内容区域的布局是否正常。这里可以包含很多文字，比如：\n\n1. 第一点：这是一个很长的段落，用来测试文本的换行和缩进效果。这里可以写很多内容，比如描述一个产品的特点、功能或者使用说明。\n\n2. 第二点：这是另一个很长的段落，用来测试不同段落之间的间距。这里可以写一些技术细节、注意事项或者其他重要信息。\n\n3. 第三点：这里可以写一些代码示例或者配置说明，比如：\n```javascript\nconst example = {\n  name: 'test',\n  description: '这是一个很长的描述文本',\n  features: ['feature1', 'feature2', 'feature3']\n};\n```\n\n4. 第四点：这里可以写一些列表项，比如：\n- 第一个列表项：这是一个很长的列表项内容\n- 第二个列表项：这是另一个很长的列表项内容\n- 第三个列表项：这是第三个很长的列表项内容\n\n5. 最后一点：这里可以写一些总结性的文字，用来测试文本的结尾部分。",
        image_list: [
            "https://picsum.photos/800/1200?random=1",
            "https://picsum.photos/800/1200?random=2",
            "https://picsum.photos/800/1200?random=3",
            "https://picsum.photos/800/1200?random=4",
            "https://picsum.photos/800/1200?random=5"
        ],
        tags: ["测试", "长文本", "布局"],
        comments: [
            {
                id: 1,
                content: "这是一条非常长的评论内容，用来测试评论区域的布局是否正常。这里可以包含很多文字，比如对产品的详细评价、使用体验、改进建议等。评论内容可以包含多个段落，用来测试文本的换行和缩进效果。",
                opinion: "positive"
            },
            {
                id: 2,
                content: "这是另一条很长的评论，用来测试多条评论之间的间距和布局。这里可以写一些技术性的反馈，比如性能问题、bug报告或者功能建议。评论内容可以包含代码示例或者配置说明。",
                opinion: "negative"
            }
        ],
        opinion: "negative"
    },
    {
        id: 2,
        title: "测试数据2",
        content: "这是第二条测试数据的内容。这里包含了一些特殊字符和格式：\n\n1. 特殊字符：!@#$%^&*()_+\n2. 中文标点：，。！？；：\"\"''（）【】《》\n3. 表情符号：😊 😎 🤔 💡\n4. 换行和缩进\n\n这里是一个很长的段落，用来测试文本的自动换行效果。这里可以写很多内容，比如描述一个产品的特点、功能或者使用说明。这里可以写一些技术细节、注意事项或者其他重要信息。这里可以写一些代码示例或者配置说明。这里可以写一些列表项。这里可以写一些总结性的文字。",
        image_list: [
            "https://picsum.photos/800/1200?random=6",
            "https://picsum.photos/800/1200?random=7",
            "https://picsum.photos/800/1200?random=8"
        ],
        tags: ["特殊字符", "格式", "测试"],
        comments: [
            {
                id: 1,
                content: "这是一条包含特殊字符的评论：\n1. 特殊字符：!@#$%^&*()_+\n2. 中文标点：，。！？；：\"\"''（）【】《》\n3. 表情符号：😊 😎 🤔 💡",
                opinion: "neutral"
            }
        ],
        opinion: "agree"
    },
    {
        id: 3,
        title: "测试数据3",
        content: "这是第三条测试数据的内容。这里包含了一些代码示例：\n\n```javascript\n// 这是一个很长的代码示例\nfunction exampleFunction(param1, param2) {\n    // 这里是一些注释\n    const result = param1 + param2;\n    \n    // 这里是一些处理逻辑\n    if (result > 100) {\n        console.log('结果大于100');\n    } else {\n        console.log('结果小于等于100');\n    }\n    \n    return result;\n}\n\n// 这里是一些使用示例\nconst test1 = exampleFunction(50, 60);\nconst test2 = exampleFunction(30, 40);\n```\n\n这里是一些配置示例：\n```json\n{\n    \"name\": \"test-project\",\n    \"version\": \"1.0.0\",\n    \"description\": \"这是一个很长的项目描述\",\n    \"dependencies\": {\n        \"package1\": \"^1.0.0\",\n        \"package2\": \"^2.0.0\",\n        \"package3\": \"^3.0.0\"\n    }\n}\n```",
        image_list: [
            "https://picsum.photos/800/1200?random=9",
            "https://picsum.photos/800/1200?random=10"
        ],
        tags: ["代码", "示例", "配置"],
        comments: [
            {
                id: 1,
                content: "这是一条包含代码示例的评论：\n```javascript\nconst example = {\n    name: 'test',\n    description: '这是一个很长的描述文本',\n    features: ['feature1', 'feature2', 'feature3']\n};\n```",
                opinion: "positive"
            }
        ],
        opinion: "negative"
    },
    {
        id: 4,
        title: "测试数据4",
        content: "这是第四条测试数据的内容。这里包含了一些表格数据：\n\n| 列1 | 列2 | 列3 |\n|-----|-----|-----|\n| 数据1 | 数据2 | 数据3 |\n| 数据4 | 数据5 | 数据6 |\n| 数据7 | 数据8 | 数据9 |\n\n这里是一些列表数据：\n\n1. 第一项：这是一个很长的列表项内容\n2. 第二项：这是另一个很长的列表项内容\n3. 第三项：这是第三个很长的列表项内容\n4. 第四项：这是第四个很长的列表项内容\n5. 第五项：这是第五个很长的列表项内容\n6. 第六项：这是第六个很长的列表项内容\n7. 第七项：这是第七个很长的列表项内容\n8. 第八项：这是第八个很长的列表项内容\n9. 第九项：这是第九个很长的列表项内容\n10. 第十项：这是第十个很长的列表项内容",
        image_list: [
            "https://picsum.photos/800/1200?random=11",
            "https://picsum.photos/800/1200?random=12",
            "https://picsum.photos/800/1200?random=13",
            "https://picsum.photos/800/1200?random=14",
            "https://picsum.photos/800/1200?random=15",
            "https://picsum.photos/800/1200?random=16"
        ],
        tags: ["表格", "列表", "数据"],
        comments: [
            {
                id: 1,
                content: "这是一条包含表格数据的评论：\n\n| 优点 | 缺点 | 建议 |\n|------|------|------|\n| 功能完善 | 性能待优化 | 添加缓存 |\n| 界面美观 | 操作复杂 | 简化流程 |\n| 稳定性好 | 加载慢 | 优化加载 |",
                opinion: "neutral"
            }
        ], opinion: "negative"
    },
    {
        id: 5,
        title: "测试数据5",
        content: "这是第五条测试数据的内容。这里包含了一些引用文本：\n\n> 这是一段很长的引用文本，用来测试引用块的样式。这里可以写很多内容，比如引用一些重要的说明文档、用户反馈或者其他参考资料。引用文本可以包含多个段落，用来测试文本的换行和缩进效果。\n\n> 这是另一段引用文本，用来测试多个引用块之间的间距。这里可以写一些技术性的说明，比如API文档、开发指南或者使用教程。引用文本可以包含代码示例或者配置说明。\n\n这里是一些普通文本，用来测试引用块和普通文本之间的间距。这里可以写一些补充说明、注意事项或者其他重要信息。",
        image_list: [
            "https://picsum.photos/800/1200?random=17",
            "https://picsum.photos/800/1200?random=18",
            "https://picsum.photos/800/1200?random=19",
            "https://picsum.photos/800/1200?random=20"
        ],
        tags: ["引用", "文档", "说明"],
        comments: [
            {
                id: 1,
                content: "这是一条包含引用文本的评论：\n\n> 这是一段引用文本，用来测试评论中引用块的样式。这里可以写一些重要的反馈或者建议。引用文本可以包含多个段落，用来测试文本的换行和缩进效果。",
                opinion: "positive"
            }
        ], opinion: "negative"
    }
];