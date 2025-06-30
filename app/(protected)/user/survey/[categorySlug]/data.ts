export const levelInformation = {
    title: 'Please rate yourself on the technology',
    info: [
        {
            text: 'None (0): While you may have heard of a technology and have a general understanding of what it is, you have not used it in any way.'
        },
        {
            text: 'Novice (1): You know of the technology and have used it sparingly, but performing any tasks require significant guidance and/or research.'
        },
        {
            text: 'Intermediate (2): You have a good understanding of the technology and can perform some tasks in it without guidance, but the more complex tasks will require guidance still.'
        },
        {
            text: 'Advanced (3): You have a high level of competence in the technology.  You can handle complex tasks with little or no guidance from others and understand most of the nuances of the technology.'
        },
        {
            text: 'Expert (4): You have reached the pinnacle of understanding and implementation of a technology. You are extremely proficient in it and can tackle highly intricate and specialized tasks with the technology. You can coerce it to solve some problems that it is typically not used for. Others, including other experts, will come to you for advice on how to solve some complex problems as well as best practices.'
        },
        {
            text: 'Master (5): You can write a book on the technology if you wanted to. You not only an expert in the technology, you have a profound understanding of the underlying principles and history of it. You can be on a panel with other experts to discuss the technology and future.'
        }
    ]
}
export const levelMeta = [
    {
        level: 0,
        title: 'Blank Canvas',
        tagline: 'You’re a blank canvas, albeit a pretty one!',
        definition: levelInformation.info[0].text,
        imgSrc: '/level0.png',
    },
    {
        level: 1,
        title: 'Novice',
        tagline: 'Research-powered rookie',
        definition: levelInformation.info[1].text,
        imgSrc: '/level01.png',
    },
    {
        level: 2,
        title: 'Intermediate',
        tagline: 'Puzzle-solver in training',
        definition: levelInformation.info[2].text,
        imgSrc: '/level02.png',
    },
    {
        level: 3,
        title: 'Advanced',
        tagline: 'Complex tasks, meet your match',
        definition: levelInformation.info[3].text,
        imgSrc: '/level03.png',
    },
    {
        level: 4,
        title: 'Expert',
        tagline: 'Summit-seeker and problem-solver',
        definition: levelInformation.info[4].text,
        imgSrc: '/level04.png',
    },
    {
        level: 5,
        title: 'Master',
        tagline: 'Can write the book on this, if the payout is right',
        definition: levelInformation.info[5].text,
        imgSrc: '/level05.png',
    },
]
