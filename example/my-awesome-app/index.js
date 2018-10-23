function doRandomStuff() {
  console.log('Log message from my awesome app!');

  setTimeout(doRandomStuff, (Math.random() * (5 - 2) + 2) * 1000);
}

doRandomStuff();
