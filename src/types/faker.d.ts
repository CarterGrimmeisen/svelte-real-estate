// Type definitions for faker 5.5
// Project: http://marak.com/faker.js/
// Definitions by: Ben Swartz <https://github.com/bensw>
//                 Bas Pennings <https://github.com/basp>
//                 Yuki Kokubun <https://github.com/Kuniwak>
//                 Matt Bishop <https://github.com/mattbishop>
//                 Leonardo Testa <https://github.com/testica>
//                 Sebastian Pettersson <https://github.com/TastefulElk>
//                 Daniel Montesinos <https://github.com/damonpam>
//                 Shinya Ohyanagi <https://github.com/heavenshell>
//                 Piotr Kuczynski <https://github.com/pkuczynski>
//                 Jérémie Parker <https://github.com/p-j>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Faker {
  interface FakerStatic {
    image: {
      image(): string;
      avatar(): string;
      imageUrl(width?: number, height?: number, category?: string, randomize?: boolean, https?: boolean): string;
      abstract(width?: number, height?: number): string;
      animals(width?: number, height?: number): string;
      business(width?: number, height?: number): string;
      cats(width?: number, height?: number): string;
      city(width?: number, height?: number): string;
      food(width?: number, height?: number): string;
      nightlife(width?: number, height?: number): string;
      fashion(width?: number, height?: number): string;
      people(width?: number, height?: number): string;
      nature(width?: number, height?: number): string;
      sports(width?: number, height?: number): string;
      technics(width?: number, height?: number): string;
      transport(width?: number, height?: number): string;
      dataUri(width?: number, height?: number, color?: string): string;
      unsplash: {
        avatar(): string
        buildings(width?: number, height?: number, keyword?: string): string
        food(width?: number, height?: number, keyword?: string): string
        image(width?: number, height?: number, keyword?: string): string
        imageUrl(width?: number, height?: number, category?: string, keyword?: string): string
        nature(width?: number, height?: number, keyword?: string): string
        objects(width?: number, height?: number, keyword?: string): string
        people(width?: number, height?: number, keyword?: string): string
        technology(width?: number, height?: number, keyword?: string): string
      }
    };
  }
}