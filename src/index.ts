function formatBirdInfo(bird) {
  return `The ${bird.name} has a wingspan of ${bird.wingspan} cm and is ${bird.color}.`;
}

const bird = {
  name: "Eagle",
  wingspan: "220",
  color: "brown",
}

const formattedInfo = formatBirdInfo(bird);
