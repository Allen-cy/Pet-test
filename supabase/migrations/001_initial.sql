-- ================================================
-- 宠物缘分测试 - Supabase 数据库建表语句
-- ================================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------
-- 表1: 测试结果表 (test_results)
-- 存储每次测试的完整结果
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255),                    -- 客户端会话ID
    answers JSONB NOT NULL,                     -- 用户答案 {questionId, optionIndex}[]
    result_pet VARCHAR(50) NOT NULL,            -- 测试结果宠物ID (dog/cat/rabbit/small/fish/bird)
    total_scores JSONB,                         -- 各宠物总得分
    report_unlocked BOOLEAN DEFAULT FALSE,      -- 是否解锁了完整报告
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_test_results_session_id ON public.test_results(session_id);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON public.test_results(created_at DESC);

-- RLS 策略: 公开读取，公开写入
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.test_results
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON public.test_results
    FOR INSERT WITH CHECK (true);

-- ----------------------------------------------------
-- 表2: 宠物数据表 (pets)
-- 存储宠物详细信息（可动态管理）
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pets (
    id VARCHAR(50) PRIMARY KEY,                 -- 宠物ID (dog/cat/rabbit/small/fish/bird)
    name VARCHAR(100) NOT NULL,                  -- 宠物名称
    title VARCHAR(200),                         -- 称号
    short_desc TEXT,                            -- 简短描述
    why_suitable TEXT,                          -- 为什么适合
    daily_scene TEXT,                           -- 日常生活场景
    advice TEXT,                                -- 建议
    tags TEXT[],                                -- 标签数组
    bg_gradient VARCHAR(100),                  -- 背景渐变
    accent_color VARCHAR(20),                   -- 强调色
    emoji VARCHAR(10),                          -- emoji
    image VARCHAR(500),                         -- 图片URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入宠物数据
INSERT INTO public.pets (id, name, title, short_desc, why_suitable, daily_scene, advice, tags, bg_gradient, accent_color, emoji, image) VALUES
('cat', '猫', '独立灵魂的安静陪伴者', '你的灵魂深处拥有一种罕见的宁静力量。正如猫科动物在夜色中穿行，你不随波逐流，始终保持着清晰的自我边界与观察力。', '你的内在世界如同一座静谧的图书馆，既充满深度又保有难得的自省空间。这种性格特质与猫科动物的"灵魂共振"极高。你们都懂得在喧嚣中寻找孤独的价值，不需要无意义的社交来填补空虚。', '某个落日余晖的下午，你在读一本泛黄的旧书，它就在你膝盖边的阳光影子里缓慢翻身。', '虽然你们的灵魂极其契合，但别忘了，它也是一个拥有独立意志的小生命。在最初的相处中，给它足够多的时间去"审核"你的领地。', ARRAY['优雅神秘', '边界感', '深情内敛'], 'from-[#2C2420] to-[#6B4E37]', '#E8C9A0', '🐈', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800'),
('dog', '狗', '忠诚热烈的灵魂守护者', '你拥有一颗温暖而敞开的心。像狗狗一样，你对待世界充满热情与善意，渴望建立深厚、无条件的羁绊。', '你是一个愿意付出爱并渴望被热烈回应的人。狗狗的忠诚与直白完美契合了你对纯粹情感的向往。在它们的世界里，你就是唯一，这种毫无保留的爱能给你带来极大的安全感。', '清晨的阳光刚洒进房间，它已经摇着尾巴在床边等你，用湿漉漉的鼻子唤醒你新的一天。', '狗狗的爱是热烈且需要回应的。请确保你有足够的时间和精力去陪伴它，你的每一次抚摸和互动，都是它生命中最期待的时刻。', ARRAY['热情阳光', '忠诚守护', '活力满满'], 'from-[#1A2E1A] to-[#4A7040]', '#A8D88A', '🐕', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800'),
('rabbit', '兔子', '温婉细腻的无声倾听者', '你内心柔软，对周遭事物有着极其敏锐的感知。你不需要轰轰烈烈的表达，更偏爱细水长流的温情。', '你的性格中带着一种安静的力量，不喜欢冲突与喧闹。兔子的温顺和安静能为你提供一个完美的避风港。你们的相处不需要太多语言，一个眼神、一次抚摸，就能传递彼此的安心。', '夜深人静时，你敲击着键盘，它安静地趴在你的脚边，偶尔抖动一下长长的耳朵。', '兔子虽然安静，但内心非常敏感脆弱。它们需要一个稳定、没有压力的环境。请用你最温柔的耐心去呵护这个胆小却纯洁的灵魂。', ARRAY['温柔治愈', '心思细腻', '安静陪伴'], 'from-[#2A1F2E] to-[#5E4480]', '#C9B4E8', '🐇', 'https://images.unsplash.com/photo-1585110396000-c9fd7e48154e?auto=format&fit=crop&q=80&w=800'),
('small', '仓鼠', '微小确幸的治愈系精灵', '你懂得在平凡的生活中寻找微小的快乐。你可能生活节奏紧凑，但内心始终保留着一块柔软的童话角落。', '你可能没有太多时间去照顾大型宠物，但你依然渴望生命的陪伴。仓鼠小巧、独立，它们在自己的小世界里忙碌的模样，能瞬间治愈你一天的疲惫，让你感受到生命生生不息的活力。', '下班回到家，看着它在跑轮上不知疲倦地奔跑，你忍不住塞给它一颗瓜子，看着它把脸颊塞得鼓鼓的。', '虽然它们体型微小，生命周期较短，但请不要因此忽视对它们的关爱。给它们提供丰富的玩具和舒适的环境，让它们短暂的一生充满快乐。', ARRAY['小巧可爱', '自得其乐', '微小治愈'], 'from-[#2E2010] to-[#7A5830]', '#F0C878', '🐹', 'https://images.unsplash.com/photo-1425082661705-1834bfd0999c?auto=format&fit=crop&q=80&w=800'),
('fish', '鱼', '沉静如水的哲思观察者', '你拥有超然物外的气质，喜欢观察而非介入。你追求内心的平静与秩序，欣赏流动与变化的美。', '你不需要宠物提供热烈的情感反馈，你更享受一种"观赏"与"共存"的状态。鱼儿在水中自由游弋的姿态，能让你在凝视中进入冥想状态，洗涤内心的焦躁与烦恼。', '房间里只剩下水泵轻柔的过滤声，你坐在鱼缸前，看着波光粼粼中那一抹游动的色彩，思绪渐渐飘远。', '养鱼即是养水。这需要你具备一定的耐心和科学精神。维护一个微型生态系统的平衡，将成为你修心的一种方式。', ARRAY['沉静如水', '超然物外', '流动之美'], 'from-[#0D1E2E] to-[#1A4A6A]', '#78C8F0', '🐠', 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800'),
('bird', '鸟', '自由灵动的云端歌唱家', '你向往自由，思维活跃，生活中充满色彩与旋律。你喜欢互动，渴望一个能与你"对话"的聪明伙伴。', '鸟类聪明、机警且富有表现力。它们不仅能为你提供视觉上的美感，还能用声音填满你的生活空间。对于渴望互动和反馈的你来说，一只会唱歌或说话的鸟儿，是打破生活沉闷的最佳选择。', '阳光明媚的早晨，你一边准备早餐，一边听着它清脆的鸣叫，甚至它还会模仿你的口哨声与你互动。', '鸟类非常聪明，也因此容易感到无聊。它们需要你的关注和互动，以及足够的笼外活动时间。请把它们当作一个聪明的孩子来对待。', ARRAY['自由灵动', '聪明机警', '天生歌者'], 'from-[#1A2A10] to-[#4A7020]', '#C8E878', '🦜', 'https://images.unsplash.com/photo-1552728089-57105a8e7ceb?auto=format&fit=crop&q=80&w=800')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    short_desc = EXCLUDED.short_desc,
    why_suitable = EXCLUDED.why_suitable,
    daily_scene = EXCLUDED.daily_scene,
    advice = EXCLUDED.advice,
    tags = EXCLUDED.tags,
    bg_gradient = EXCLUDED.bg_gradient,
    accent_color = EXCLUDED.accent_color,
    emoji = EXCLUDED.emoji,
    image = EXCLUDED.image,
    updated_at = NOW();

-- RLS for pets
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read pets" ON public.pets
    FOR SELECT USING (true);

-- ----------------------------------------------------
-- 表3: 问卷题目表 (questions)
-- 存储问卷题目（可动态管理）
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.questions (
    id SERIAL PRIMARY KEY,
    dim VARCHAR(10),                             -- 维度标识
    text TEXT NOT NULL,                         -- 题目文本
    options JSONB NOT NULL,                     -- 选项 [{text, score}]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入问卷数据
INSERT INTO public.questions (dim, text, options) VALUES
('A', '你的日常作息节奏是？', '[{"text":"非常规律，几点起几点睡基本固定","score":{"dog":3,"cat":1,"rabbit":2,"small":2,"fish":2,"bird":2}},{"text":"大致规律，但偶尔会有波动","score":{"dog":2,"cat":2,"rabbit":2,"small":2,"fish":2,"bird":2}},{"text":"不太规律，经常熬夜或作息混乱","score":{"dog":0,"cat":3,"rabbit":1,"small":1,"fish":3,"bird":0}},{"text":"完全随心，随遇而安","score":{"dog":0,"cat":3,"rabbit":1,"small":1,"fish":3,"bird":1}}]'),
('B', '周末难得休息，你更倾向于怎么度过？', '[{"text":"去户外徒步、运动，释放精力","score":{"dog":3,"cat":0,"rabbit":0,"small":0,"fish":0,"bird":2}},{"text":"找个安静的咖啡馆看书发呆","score":{"dog":0,"cat":3,"rabbit":2,"small":1,"fish":2,"bird":0}},{"text":"宅在家里打扫卫生、布置房间","score":{"dog":1,"cat":2,"rabbit":2,"small":3,"fish":3,"bird":1}},{"text":"和朋友聚餐、逛街、看电影","score":{"dog":2,"cat":1,"rabbit":0,"small":1,"fish":0,"bird":2}}]'),
('C', '当你感到压力很大时，你通常会？', '[{"text":"找人倾诉，大哭一场","score":{"dog":3,"cat":0,"rabbit":1,"small":0,"fish":0,"bird":2}},{"text":"一个人静静待着，自我消化","score":{"dog":0,"cat":3,"rabbit":2,"small":1,"fish":3,"bird":0}},{"text":"做一些重复性的手工或家务","score":{"dog":0,"cat":1,"rabbit":2,"small":3,"fish":2,"bird":1}},{"text":"去运动出汗，或者大吃一顿","score":{"dog":2,"cat":0,"rabbit":0,"small":1,"fish":0,"bird":1}}]'),
('D', '你理想中的居住环境是？', '[{"text":"宽敞明亮，有大阳台或院子","score":{"dog":3,"cat":1,"rabbit":1,"small":0,"fish":1,"bird":2}},{"text":"温馨舒适，有很多柔软的靠垫","score":{"dog":1,"cat":3,"rabbit":3,"small":1,"fish":0,"bird":0}},{"text":"极简干净，东西越少越好","score":{"dog":0,"cat":1,"rabbit":0,"small":2,"fish":3,"bird":0}},{"text":"充满生活气息，有很多小摆件","score":{"dog":1,"cat":1,"rabbit":1,"small":3,"fish":1,"bird":2}}]'),
('E', '你对待感情的态度更接近？', '[{"text":"热烈直接，毫无保留","score":{"dog":3,"cat":0,"rabbit":0,"small":0,"fish":0,"bird":1}},{"text":"慢热内敛，需要时间建立信任","score":{"dog":0,"cat":3,"rabbit":2,"small":1,"fish":1,"bird":0}},{"text":"顺其自然，不强求不执着","score":{"dog":1,"cat":2,"rabbit":1,"small":2,"fish":3,"bird":1}},{"text":"细水长流，注重日常的陪伴","score":{"dog":2,"cat":1,"rabbit":3,"small":2,"fish":1,"bird":1}}]'),
('F', '如果宠物弄坏了你心爱的物品，你的第一反应是？', '[{"text":"非常生气，必须严厉教育","score":{"dog":1,"cat":0,"rabbit":0,"small":0,"fish":3,"bird":0}},{"text":"无奈叹气，默默收拾残局","score":{"dog":1,"cat":3,"rabbit":2,"small":2,"fish":1,"bird":1}},{"text":"觉得好笑，先拍个照发朋友圈","score":{"dog":2,"cat":2,"rabbit":1,"small":1,"fish":0,"bird":2}},{"text":"反思是不是自己没把东西收好","score":{"dog":2,"cat":1,"rabbit":3,"small":3,"fish":1,"bird":1}}]'),
('G', '你每天能抽出多少时间专门陪伴宠物？', '[{"text":"2小时以上，随时待命","score":{"dog":3,"cat":1,"rabbit":1,"small":0,"fish":0,"bird":2}},{"text":"1-2小时，主要在早晚","score":{"dog":2,"cat":2,"rabbit":2,"small":1,"fish":1,"bird":2}},{"text":"半小时左右，摸摸抱抱","score":{"dog":0,"cat":3,"rabbit":2,"small":2,"fish":1,"bird":1}},{"text":"时间很少，只能保证基本喂养","score":{"dog":0,"cat":0,"rabbit":0,"small":3,"fish":3,"bird":0}}]'),
('H', '你对宠物掉毛的容忍度是？', '[{"text":"完全不能忍受，有洁癖","score":{"dog":0,"cat":0,"rabbit":0,"small":1,"fish":3,"bird":2}},{"text":"能接受少量，定期清理即可","score":{"dog":1,"cat":1,"rabbit":2,"small":3,"fish":2,"bird":1}},{"text":"无所谓，习惯了就好","score":{"dog":3,"cat":3,"rabbit":2,"small":1,"fish":0,"bird":0}},{"text":"觉得毛茸茸的到处都是也很可爱","score":{"dog":2,"cat":3,"rabbit":3,"small":0,"fish":0,"bird":0}}]'),
('I', '你希望宠物在你的生活中扮演什么角色？', '[{"text":"形影不离的家人","score":{"dog":3,"cat":1,"rabbit":1,"small":0,"fish":0,"bird":1}},{"text":"保持距离的室友","score":{"dog":0,"cat":3,"rabbit":1,"small":1,"fish":2,"bird":0}},{"text":"需要呵护的小宝宝","score":{"dog":1,"cat":1,"rabbit":3,"small":2,"fish":0,"bird":1}},{"text":"安静美丽的艺术品","score":{"dog":0,"cat":1,"rabbit":0,"small":1,"fish":3,"bird":1}}]'),
('J', '你更喜欢哪种声音环境？', '[{"text":"绝对安静，一点噪音都受不了","score":{"dog":0,"cat":2,"rabbit":3,"small":1,"fish":3,"bird":0}},{"text":"有点白噪音，比如水流声或轻音乐","score":{"dog":0,"cat":2,"rabbit":1,"small":2,"fish":3,"bird":1}},{"text":"充满生机，喜欢听大自然的声音","score":{"dog":1,"cat":1,"rabbit":1,"small":1,"fish":1,"bird":3}},{"text":"热闹喧嚣，有人气的感觉","score":{"dog":3,"cat":0,"rabbit":0,"small":0,"fish":0,"bird":2}}]'),
('K', '如果宠物生病了，你会？', '[{"text":"非常焦虑，立刻请假带去看医生","score":{"dog":3,"cat":3,"rabbit":3,"small":1,"fish":0,"bird":2}},{"text":"先上网查资料，观察一下再决定","score":{"dog":1,"cat":2,"rabbit":1,"small":2,"fish":1,"bird":1}},{"text":"觉得是自然规律，顺其自然","score":{"dog":0,"cat":0,"rabbit":0,"small":1,"fish":3,"bird":0}},{"text":"平时就做好预防，很少生病","score":{"dog":2,"cat":2,"rabbit":2,"small":2,"fish":2,"bird":2}}]'),
('L', '你对宠物智商的要求是？', '[{"text":"越聪明越好，能听懂指令","score":{"dog":3,"cat":1,"rabbit":0,"small":0,"fish":0,"bird":3}},{"text":"有点小聪明就行，会互动","score":{"dog":2,"cat":3,"rabbit":1,"small":1,"fish":0,"bird":2}},{"text":"笨笨的也很可爱，不需要太聪明","score":{"dog":1,"cat":1,"rabbit":3,"small":3,"fish":1,"bird":0}},{"text":"完全不在乎智商，好看就行","score":{"dog":0,"cat":1,"rabbit":1,"small":1,"fish":3,"bird":1}}]'),
('M', '你每个月愿意为宠物花费多少钱？', '[{"text":"1000元以上，给它最好的","score":{"dog":3,"cat":3,"rabbit":1,"small":0,"fish":2,"bird":1}},{"text":"500-1000元，保证生活质量","score":{"dog":2,"cat":2,"rabbit":2,"small":1,"fish":1,"bird":2}},{"text":"200-500元，经济适用","score":{"dog":1,"cat":1,"rabbit":3,"small":2,"fish":1,"bird":1}},{"text":"200元以下，能省则省","score":{"dog":0,"cat":0,"rabbit":1,"small":3,"fish":2,"bird":1}}]'),
('N', '你旅行或出差的频率是？', '[{"text":"经常出差，十天半个月不在家","score":{"dog":0,"cat":0,"rabbit":0,"small":1,"fish":3,"bird":0}},{"text":"偶尔短途旅行，两三天左右","score":{"dog":1,"cat":2,"rabbit":1,"small":2,"fish":2,"bird":1}},{"text":"很少出门，基本都在家","score":{"dog":3,"cat":3,"rabbit":3,"small":2,"fish":1,"bird":3}},{"text":"出门一定要带着宠物一起","score":{"dog":3,"cat":1,"rabbit":0,"small":0,"fish":0,"bird":1}}]'),
('O', '你更喜欢哪种触感？', '[{"text":"毛茸茸、温暖柔软的","score":{"dog":2,"cat":3,"rabbit":3,"small":2,"fish":0,"bird":0}},{"text":"结实、有力量感的","score":{"dog":3,"cat":1,"rabbit":0,"small":0,"fish":0,"bird":0}},{"text":"光滑、冰凉的","score":{"dog":0,"cat":0,"rabbit":0,"small":0,"fish":3,"bird":0}},{"text":"轻盈、羽毛般的","score":{"dog":0,"cat":0,"rabbit":0,"small":0,"fish":0,"bird":3}}]'),
('P', '当你工作或学习时，你希望宠物？', '[{"text":"安静地待在旁边陪着我","score":{"dog":1,"cat":3,"rabbit":3,"small":1,"fish":1,"bird":0}},{"text":"自己去玩，不要打扰我","score":{"dog":0,"cat":2,"rabbit":1,"small":3,"fish":3,"bird":1}},{"text":"偶尔过来求摸摸，互动一下","score":{"dog":2,"cat":2,"rabbit":1,"small":1,"fish":0,"bird":2}},{"text":"最好能和我一起\"工作\"","score":{"dog":3,"cat":0,"rabbit":0,"small":0,"fish":0,"bird":1}}]'),
('Q', '你对宠物寿命的看法是？', '[{"text":"希望它能陪伴我越久越好","score":{"dog":3,"cat":3,"rabbit":1,"small":0,"fish":1,"bird":3}},{"text":"顺其自然，珍惜在一起的时光","score":{"dog":2,"cat":2,"rabbit":2,"small":2,"fish":2,"bird":2}},{"text":"害怕面对离别，不敢养寿命太长的","score":{"dog":0,"cat":0,"rabbit":1,"small":3,"fish":1,"bird":0}},{"text":"无所谓，只在乎曾经拥有","score":{"dog":1,"cat":1,"rabbit":1,"small":2,"fish":3,"bird":1}}]'),
('R', '最后，凭直觉选择一个词：', '[{"text":"羁绊","score":{"dog":3,"cat":1,"rabbit":1,"small":0,"fish":0,"bird":1}},{"text":"自由","score":{"dog":0,"cat":3,"rabbit":0,"small":1,"fish":2,"bird":3}},{"text":"宁静","score":{"dog":0,"cat":2,"rabbit":3,"small":1,"fish":3,"bird":0}},{"text":"生机","score":{"dog":2,"cat":1,"rabbit":1,"small":3,"fish":1,"bird":2}}]')
ON CONFLICT DO NOTHING;

-- RLS for questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read questions" ON public.questions
    FOR SELECT USING (true);

-- ----------------------------------------------------
-- 统计视图
-- ----------------------------------------------------
CREATE OR REPLACE VIEW public.test_stats AS
SELECT
    result_pet,
    COUNT(*) as test_count,
    COUNT(CASE WHEN report_unlocked THEN 1 END) as unlock_count,
    NOW() as generated_at
FROM public.test_results
GROUP BY result_pet
ORDER BY test_count DESC;

-- Grant public access to stats view
GRANT SELECT ON public.test_stats TO public;
