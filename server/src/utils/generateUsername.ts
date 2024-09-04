const adjectives = [
    'brave',
    'calm',
    'eager',
    'fancy',
    'glorious',
    'happy',
    'jolly',
    'kind',
    'lively',
    'mighty',
    'nice',
    'proud',
    'quick',
    'shiny',
    'unique',
];

const nouns = [
    'eagle',
    'lion',
    'tiger',
    'wolf',
    'whale',
    'panda',
    'fox',
    'otter',
    'dolphin',
    'unicorn',
    'dragon',
    'phoenix',
    'griffin',
    'centaur',
    'mermaid',
];

function getRandomElement(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUsername(): string {
    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    const randomNumber = Math.floor(Math.random() * 1000); // Optional: Add a number for uniqueness
    return `${adjective}-${noun}-${randomNumber}`;
}
