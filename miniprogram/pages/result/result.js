const pets = {
  cat: { id: 'cat', name: '猫', emoji: '🐈', title: '独立灵魂的安静陪伴者', shortDesc: '你的灵魂深处拥有一种罕见的宁静力量。正如猫科动物在夜色中穿行，你不随波逐流，始终保持着清晰的自我边界与观察力。', accentColor: '#E8C9A0', bgGradientStart: '#2C2420', bgGradientEnd: '#6B4E37', tags: ['优雅神秘', '边界感', '深情内敛'], image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800' },
  dog: { id: 'dog', name: '狗', emoji: '🐕', title: '忠诚热烈的灵魂守护者', shortDesc: '你拥有一颗温暖而敞开的心。像狗狗一样，你对待世界充满热情与善意，渴望建立深厚、无条件的羁绊。', accentColor: '#A8D88A', bgGradientStart: '#1A2E1A', bgGradientEnd: '#4A7040', tags: ['热情阳光', '忠诚守护', '活力满满'], image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800' },
  rabbit: { id: 'rabbit', name: '兔子', emoji: '🐇', title: '温婉细腻的无声倾听者', shortDesc: '你内心柔软，对周遭事物有着极其敏锐的感知。你不需要轰轰烈烈的表达，更偏爱细水长流的温情。', accentColor: '#C9B4E8', bgGradientStart: '#2A1F2E', bgGradientEnd: '#5E4480', tags: ['温柔治愈', '心思细腻', '安静陪伴'], image: 'https://images.unsplash.com/photo-1585110396000-c9fd7e48154e?auto=format&fit=crop&q=80&w=800' },
  small: { id: 'small', name: '仓鼠', emoji: '🐹', title: '微小确幸的治愈系精灵', shortDesc: '你懂得在平凡的生活中寻找微小的快乐。你可能生活节奏紧凑，但内心始终保留着一块柔软的童话角落。', accentColor: '#F0C878', bgGradientStart: '#2E2010', bgGradientEnd: '#7A5830', tags: ['小巧可爱', '自得其乐', '微小治愈'], image: 'https://images.unsplash.com/photo-1425082661705-1834bfd0999c?auto=format&fit=crop&q=80&w=800' },
  fish: { id: 'fish', name: '鱼', emoji: '🐠', title: '沉静如水的哲思观察者', shortDesc: '你拥有超然物外的气质，喜欢观察而非介入。你追求内心的平静与秩序，欣赏流动与变化的美。', accentColor: '#78C8F0', bgGradientStart: '#0D1E2E', bgGradientEnd: '#1A4A6A', tags: ['沉静如水', '超然物外', '流动之美'], image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800' },
  bird: { id: 'bird', name: '鸟', emoji: '🦜', title: '自由灵动的云端歌唱家', shortDesc: '你向往自由，思维活跃，生活中充满色彩与旋律。你喜欢互动，渴望一个能与你"对话"的聪明伙伴。', accentColor: '#C8E878', bgGradientStart: '#1A2A10', bgGradientEnd: '#4A7020', tags: ['自由灵动', '聪明机警', '天生歌者'], image: 'https://images.unsplash.com/photo-1552728089-57105a8e7ceb?auto=format&fit=crop&q=80&w=800' }
}

Page({
  data: {
    pet: null,
    loading: true
  },

  onLoad(options) {
    const petId = options.petId || 'cat'
    const pet = pets[petId]
    this.setData({ pet })

    setTimeout(() => {
      this.setData