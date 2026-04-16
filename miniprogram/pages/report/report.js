const app = getApp()

const petsData = {
  cat: { id: 'cat', name: '猫', emoji: '🐈', title: '独立灵魂的安静陪伴者', shortDesc: '你的灵魂深处拥有一种罕见的宁静力量...', whySuitable: '你的内在世界如同一座静谧的图书馆，既充满深度又保有难得的自省空间。这种性格特质与猫科动物的"灵魂共振"极高。你们都懂得在喧嚣中寻找孤独的价值，不需要无意义的社交来填补空虚。', dailyScene: '某个落日余晖的下午，你在读一本泛黄的旧书，它就在你膝盖边的阳光影子里缓慢翻身。', advice: '虽然你们的灵魂极其契合，但别忘了，它也是一个拥有独立意志的小生命。在最初的相处中，给它足够多的时间去"审核"你的领地。', tags: ['优雅神秘', '边界感', '深情内敛'], image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800' },
  dog: { id: 'dog', name: '狗', emoji: '🐕', title: '忠诚热烈的灵魂守护者', shortDesc: '你拥有一颗温暖而敞开的心...', whySuitable: '你是一个愿意付出爱并渴望被热烈回应的人。狗狗的忠诚与直白完美契合了你对纯粹情感的向往。在它们的世界里，你就是唯一，这种毫无保留的爱能给你带来极大的安全感。', dailyScene: '清晨的阳光刚洒进房间，它已经摇着尾巴在床边等你，用湿漉漉的鼻子唤醒你新的一天。', advice: '狗狗的爱是热烈且需要回应的。请确保你有足够的时间和精力去陪伴它，你的每一次抚摸和互动，都是它生命中最期待的时刻。', tags: ['热情阳光', '忠诚守护', '活力满满'], image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800' },
  rabbit: { id: 'rabbit', name: '兔子', emoji: '🐇', title: '温婉细腻的无声倾听者', shortDesc: '你内心柔软...', whySuitable: '你的性格中带着一种安静的力量，不喜欢冲突与喧闹。兔子的温顺和安静能为你提供一个完美的避风港。你们的相处不需要太多语言，一个眼神、一次抚摸，就能传递彼此的安心。', dailyScene: '夜深人静时，你敲击着键盘，它安静地趴在你的脚边，偶尔抖动一下长长的耳朵。', advice: '兔子虽然安静，但内心非常敏感脆弱。它们需要一个稳定、没有压力的环境。请用你最温柔的耐心去呵护这个胆小却纯洁的灵魂。', tags: ['温柔治愈', '心思细腻', '安静陪伴'], image: 'https://images.unsplash.com/photo-1585110396000-c9fd7e48154e?auto=format&fit=crop&q=80&w=800' },
  small: { id: 'small', name: '仓鼠', emoji: '🐹', title: '微小确幸的治愈系精灵', shortDesc: '你懂得在平凡的生活中寻找微小的快乐...', whySuitable: '你可能没有太多时间去照顾大型宠物，但你依然渴望生命的陪伴。仓鼠小巧、独立，它们在自己的小世界里忙碌的模样，能瞬间治愈你一天的疲惫。', dailyScene: '下班回到家，看着它在跑轮上不知疲倦地奔跑，你忍不住塞给它一颗瓜子，看着它把脸颊塞得鼓鼓的。', advice: '虽然它们体型微小，生命周期较短，但请不要因此忽视对它们的关爱。给它们提供丰富的玩具和舒适的环境。', tags: ['小巧可爱', '自得其乐', '微小治愈'], image: 'https://images.unsplash.com/photo-1425082661705-1834bfd0999c?auto=format&fit=crop&q=80&w=800' },
  fish: { id: 'fish', name: '鱼', emoji: '🐠', title: '沉静如水的哲思观察者', shortDesc: '你拥有超然物外的气质...', whySuitable: '你不需要宠物提供热烈的情感反馈，你更享受一种"观赏"与"共存"的状态。鱼儿在水中自由游弋的姿态，能让你在凝视中进入冥想状态。', dailyScene: '房间里只剩下水泵轻柔的过滤声，你坐在鱼缸前，看着波光粼粼中那一抹游动的色彩，思绪渐渐飘远。', advice: '养鱼即是养水。这需要你具备一定的耐心和科学精神。维护一个微型生态系统的平衡，将成为你修心的一种方式。', tags: ['沉静如水', '超然物外', '流动之美'], image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800' },
  bird: { id: 'bird', name: '鸟', emoji: '🦜', title: '自由灵动的云端歌唱家', shortDesc: '你向往自由，思维活跃...', whySuitable: '鸟类聪明、机警且富有表现力。它们不仅能为你提供视觉上的美感，还能用声音填满你的生活空间。', dailyScene: '阳光明媚的早晨，你一边准备早餐，一边听着它清脆的鸣叫，甚至它还会模仿你的口哨声与你互动。', advice: '鸟类非常聪明，也因此容易感到无聊。它们需要你的关注和互动，以及足够的笼外活动时间。请把它们当作一个聪明的孩子来对待。', tags: ['自由灵动', '聪明机警', '天生歌者'], image: 'https://images.unsplash.com/photo-1552728089-57105a8e7ceb?auto=format&fit=crop&q=80&w=800' }
}

Page({
  data: {
    pet: null
  },

  onLoad() {
    const petId = app.globalData.petId || 'cat'
    const pet = petsData[petId]
    this.setData({ pet })
  },

  onGenerateCard() {
    wx.redirectTo({
      url: '/pages/card/card'
    })
  }
})
