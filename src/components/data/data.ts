//------- Images -------

// Files under public/images.
export const images = {
  marchingSS: "/images/MarchingSS.png",
  jazzEnsTitles: "/images/jazzEnsTitles.jpg",
  zach: "/images/zach.png",

  orch2: "/images/orch2.jpg",
  all: "/images/all.jpg",
  bandRoom: "/images/bandRoom.png",
  car: "/images/car.jpg",
  comp: "/images/comp.jpg",
  orch: "/images/orch.png",
  solo: "/images/solo.jpg",

  s1: "/images/comps/s1.jpg",
  s2: "/images/comps/s2.jpg",
  s3: "/images/comps/s3.jpg",
  s4: "/images/comps/s4.jpg",
  s5: "/images/comps/s5.jpg",
  s6: "/images/comps/s6.jpg",
  s7: "/images/comps/s7.jpg",
  s8: "/images/comps/s8.jpg",
  s9: "/images/comps/s9.jpg",
  s10: "/images/comps/s10.jpg",
  s11: "/images/comps/s11.jpg",
  s12: "/images/comps/s12.jpg",
  s13: "/images/comps/s13.jpg",
  s14: "/images/comps/s14.jpg",
  s15: "/images/comps/s15.jpg",
  s16: "/images/comps/s16.jpg",
  s17: "/images/comps/s17.jpg",
  s18: "/images/comps/s18.jpg",
} as const;

//------- Compositions -------

/**
 * Source of truth for composition types: the union is derived from these keys,
 * so adding a type is one edit here. The order written here is the order the
 * filter row renders on /compositions.
 */
export const compositionTypeLabels = {
  symphony: "Symphony",
  suite: "Suite",
  overture: "Overture",
  concertos: "Concertos",
  solo: "Solo",
  chamber: "Chamber",
  other: "Other",
  writing: "Writing",
  // future-> ballet
} as const satisfies Record<string, string>;

export type CompositionType = keyof typeof compositionTypeLabels;

export type Composition = {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  type: CompositionType;
  duration?: string;
  scoring?: string;
  blurb: string;
  description?: string[];
  image: string | null;
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  youtube?: { src: string; label: string };
  // purchaseUrl?: string;
  landingComp?: true;
  featured?: true;
};

export const compositions: Composition[] = [
  {
    slug: "tidewater",
    title: "Tidewater",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "solo",
    duration: "14 minutes",
    scoring: "3.2.2.2 / 4.3.3.1 / timp / 2 perc / hp / str",
    blurb:
      "A single arc from stillness to full tide, built on a rising figure that never quite resolves until the final bar.",
    description: [
      "akwndwakjdawdjbawdkjbwadkjbwfjbafkjbawdkjBWJRlawjndjnkjawdjnwjkaw djawkndiaowdnwoawdnwkaldnwaidowadnsawldksnawkldsawndlksnalwndsknawlkdnsanwlkdnslkanwlkdnslkanwdnslknawkndskjrbgjkbriugbriuviusbuibuenmlsudnfwdiwnueaoanfneaoaenfuutjnlkaenvljnefnaowiufneujknkjnkjawnkjawnckjawnckajwcnkajcnkajwcnkajcwnnoiseofijefoijtuikjna, a,xncaiwflamcklai dont knwow aht ia ma writing this is a really long blueb or somethinglawndlkawdlknlkn",
    ],
    image: null,
    audio: [{ src: "/audio/tidewater.mp3", label: "Placeholder recording" }],
    score: { src: "https://www.google.com", label: "Placeholder score (PDF)" },
    youtube: {
      src: "https://www.youtube.com/watch?v=bM6pPmy84oE",
      label: "Placeholder video",
    },
    // purchaseUrl: "https://www.google.com",
    landingComp: true,
    featured: true,
  },
  {
    slug: "north-light",
    title: "North Light",
    subtitle: "for string orchestra",
    year: "2024",
    type: "solo",
    duration: "9'30\"",
    scoring: "str",
    blurb:
      "Written for string orchestra, a study in cold, high sonority and the slow warming beneath it.",
    image: null,
    audio: [{ src: "/audio/north-light.mp3", label: "Placeholder recording" }],
    score: { src: "https://www.google.com", label: "Placeholder score (PDF)" },
    youtube: { src: "https://www.google.com", label: "Placeholder video" },
    // purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "three-elegies",
    title: "Three Elegies",
    subtitle: "for string quartet",
    year: "2024",
    type: "chamber",
    duration: "16'45\"",
    blurb:
      "Three short movements, each built from the same four-note descent heard at a different speed.",
    image: null,
    audio: [
      { src: "/audio/three-elegies-i.mp3", label: "I. Placeholder" },
      { src: "/audio/three-elegies-ii.mp3", label: "II. Placeholder" },
      { src: "/audio/three-elegies-iii.mp3", label: "III. Placeholder" },
    ],
    score: { src: "https://www.google.com", label: "Placeholder score (PDF)" },
    youtube: { src: "https://www.google.com", label: "Placeholder video" },
    // purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "the-still-hour",
    title: "The Still Hour",
    subtitle: "for SATB chorus",
    year: "2023",
    type: "chamber",
    duration: "6'20\"",
    blurb:
      "An unaccompanied setting for mixed chorus, written to sit in the resonance of a large room.",
    image: null,
    // purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "nocturne-for-solo-piano",
    title: "Nocturne",
    subtitle: "for solo piano",
    year: "2023",
    type: "solo",
    duration: "5'10\"",
    blurb:
      "A quiet piece in one breath, with the pedal held far longer than is comfortable.",
    image: null,
    // purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "ascent",
    title: "Ascent",
    subtitle: "for wind ensemble",
    year: "2022",
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
    // purchaseUrl: "https://www.google.com",
    featured: true,
  },
  //----------

  {
    slug: "test1",
    title: "test",
    subtitle: "test",
    year: "2022",
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
  },
  {
    slug: "test",
    title: "test",
    subtitle: "test",
    year: "2022",
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
  },
  {
    slug: "test2",
    title: "test",
    subtitle: "test",
    year: "2022",
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
  },
  {
    slug: "test3",
    title: "test",
    subtitle: "test",
    year: "2022",
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: images.marchingSS,
    featured: true,
  },
  //-------------------------------------------------------------------

  {
    slug: "syph-1",
    title: "E-Minor",
    subtitle: "For Full Orchestra",
    year: "2021",
    type: "symphony",
    duration: "1:03:51",
    scoring:
      "Piccolo\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet in C 1" +
      "\n" +
      "Trumpet in C 2" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    description: [
      "Crawford’s First Symphony was the first piece he ever made officially. After being inspired by seeing his trombone private teacher make music for him to play, he wanted to do the same. At the time, the only classical pieces he knew of were Holst’s “The Planets” and Berlioz’s “Symphonie Fantastique”. He took what he learned and in one year completed his First Symphony not even knowing all of his major or minor scales.",
      "This piece has Amazing Low Brass, Flute, Piccolo, Clarinet, English Horn, Violin, Low Strings, and Trumpet Excerpts.",
      "Fun Fact: He completed the symphony on his birthday just minutes before he went to see his private teacher conduct Dvořák’s “New World Symphony”. It would be the first time he’d ever listen to the piece and would inspire his later works exponentially. The Scherzo Finale of this work also used to be originally in D Major.",
    ],
    image: images.s1,
    youtube: {
      src: "https://www.youtube.com/watch?v=X5vxtj-Clwc",
      label: "Symphony 1 in E Minor, Full Score + Audio",
    },
    // purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "syph-2",
    title: "The Caroling Hummingbirds in F# Major ",
    subtitle: "For Full Orchestra",
    year: "2021-2023",
    type: "symphony",
    duration: "43:42",
    scoring:
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn in E 1" +
      "\n" +
      "Horn in E 2" +
      "\n" +
      "Horn in E 3" +
      "\n" +
      "Horn in E 4" +
      "\n" +
      "Trumpet in A 1" +
      "\n" +
      "Trumpet in A 2" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Bass trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Triangle" +
      "\n" +
      "Cymbals" +
      "\n" +
      "Harp" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford’s Second Symphony is about encouragement and taking
    // on obstacles that aren’t easy to overcome. He unconsciously wrote
    // this piece to build up his confidence whilst trying to be accepted
    // by school while his domestic issues began to increasingly pile up.
    // The third movement, which he considers to be the heart of this
    // work, is all about encouragement which he even presented when
    // he was in a mental Rehabilitation Facility in 2023. His music
    // inspired others in the Facility to keep pushing and helped them
    // get out of the facility. This piece has amazing low brass, Bass,
    // Violin, Flute, Harp and Horn Excerpts. Fun Fact, the original
    // manuscript never had a first movement."],
    image: images.s2,
    youtube: {
      src: "https://www.youtube.com/watch?v=jlepY6NmUUQ",
      label: 'F# Minor "The Caroling Hummingbirds" (Ver.2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-3",
    title: "Graduation Symphony in A Major",
    subtitle: "For Full Orchestra",
    year: "2021-2024",
    type: "symphony",
    duration: "40:07",
    scoring:
      "Piccolo/Alto Flute" +
      "\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet 1" +
      "\n" +
      "Trumpet 2" +
      "\n" +
      "Euphonium (Movement 2 only)" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Glockenspiel/Xylophone/Vibraophone" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford Wrote his symphony to congratulate his fellow seniors
    // in high school of his freshman year. That senior class also included
    // his sister, Zoë Crawford. He dedicated this piece to them because
    // they were a majority of the only friends he had in high school at
    // the time and didn’t know how to move on without them. The
    // motif melody is what he likes to call his “Graduation Melody” and
    // plays it whenever graduation comes to his mind. This piece has
    // fantastic Viola, Alto Flute, Euphonium, Low Strings, Violin,
    // Trumpet, Horn, Mallets, and Oboe excerpts. Fun Facts: Crawford
    // rewrote almost the entire Finale in the second version of this
    // symphony and added the Mallets."],
    image: images.s3,
    youtube: {
      src: "https://www.youtube.com/watch?v=eVimTf49lnk",
      label:
        'Crawford Symphony 3 in A Major "Graduation Symphony" (Ver. 2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-4",
    title: "Travel",
    subtitle: "For Full Orchestra",
    year: "2021-2025",
    type: "symphony",
    duration: "43:58",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Alto Flute (Only in a section of movement IV.)" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III" +
      "\n" +
      "Horn in F I" +
      "\n" +
      "Horn in F III" +
      "\n" +
      "Horn in F II" +
      "\n" +
      "Horn in F IV" +
      "\n" +
      "Trumpet in C I" +
      "\n" +
      "Trumpet in C II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Crash Cymbal/Tam-Tam" +
      "\n" +
      "Triangle" +
      "\n" +
      "Woodblocks" +
      "\n" +
      "Harp (Movement I only)" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford’s Fourth Symphony was a turning point in his musical
    // works. This was his first emotional symphony he wrote, however,
    // he was unconscious of his true purpose for this symphony until
    // years later. This symphony is dedicated to the time he ran away at
    // 12 years old. He was beaten up one time for running to class
    // everyday, trying to make it on time and still being late. A group of
    // kids didn’t appreciate him running to classes even though he never
    // bumped into anyone. After they beat him up, he told his principal
    // about it and they suspended the bullies which made them furious.
    // In retaliation, they beat him up a second time for “snitching” on
    // them. After returning home with marks, his mom reported to the
    // school despite Crawford telling her not to. This caused him to be
    // beaten up one final time, and it was merciless. He was being
    // constantly beaten up, the whole school creating rumors about
    // him, he lost trust and faith in his mom and all of this was going on
    // while domestic violence in his house grew worse and worse. In the
    // end, he felt like he didn’t belong anywhere so he decided to run
    // away. He walked all over town for 3 days until he decided that
    // what he was doing was wrong. He ran back to the school,
    // remembering the area and eventually came home to an angry
    // family. This symphony has amazing Violin, Low Brass, Piccolo,
    // Trumpet, Horn, Timpani, Clarinet, Flute, Bassoon, Low Strings,
    // and Oboe excerpts in this symphony. Fun Facts: This work was
    // originally a 6 minute overture still titled “Travel” until 2024. From
    // 2024 through 2026, Crawford has rewritten this symphony over 50
    // times whilst writing his other works that came out during those
    // years."],
    image: images.s4,
    youtube: {
      src: "https://www.youtube.com/watch?v=0Msu_I4f3zs",
      label: 'Crawford Symphony 4 "Travel" Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-5",
    title: "5 in B Minor",
    subtitle: "For Full Orchestra",
    year: "2024",
    type: "symphony",
    duration: "44:51",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet in C 1" +
      "\n" +
      "Trumpet in C 2" +
      "\n" +
      "Harpsichord (Movement III only)" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford wrote this symphony after watching a horror movie.
    // After writing down the first two movements, he learned about the
    // Harpsichord so he decided to add the instrument to the third
    // symphony. He likes to nickname this symphony his “Mysterious
    // Symphony” for how mysterious it sounds. The finale is like a
    // combination of every movement to summarize or ‘finalize’ the
    // symphony. This symphony is considered one of his favorite works
    // he’s made. This Symphony has fantastic Violin, Low Strings, Flute,
    // Piccolo, Oboe, Bassoon, and Harpsichord excerpts. Fun Facts:
    // After he wrote this symphony, he listened to Tchaikovsky for the
    // first time after he wrote this symphony and had extraordinary
    // results on his later works."],
    image: images.s5,
    youtube: {
      src: "Crawford Symphony 5 in B Minor Full Score + Audio",
      label: "https://www.youtube.com/watch?v=OOl3m8evO8c",
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-6",
    title: "World of Dreams in Eb Major",
    subtitle: "For Full Orchestra",
    year: "2022-2024",
    type: "symphony",
    duration: "52:45",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "English horn" +
      "\n" +
      "Eb Clarinet" +
      "\n" +
      "Bb Clarinet 1" +
      "\n" +
      "Bb Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Bassoon 3" +
      "\n" +
      "Bassoon 4" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet in Bb 1" +
      "\n" +
      "Trumpet in Bb 2" +
      "\n" +
      "Trumpet in Bb 3" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Snare drum" +
      "\n" +
      "Bass drum" +
      "\n" +
      "Suspended Cymbal" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Tam-Tam" +
      "\n" +
      "Triangle" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["This Symphony is the work that Crawford put the most time and
    // effort into composing. This work, made in 2022, originally was a
    // concert band piece for grade 2-3 still titled “World of Dreams”.
    // This was one of the works that was a candidate to be Crawford's
    // first premiere, but instead, the final decision was a piece called
    // “Melody of the River”
    // , which was a combination of concert band
    // and chamber orchestra. About a year later, he wrote an overture
    // titled “Tubular Bells of Light”. The title was ironic since the pieces
    // didn’t have Tubular Bells (Chimes) in the instrumentation. When
    // Crawford ran out of ideas and wanted to write a new symphony in
    // Eb Major, and a year later, he decided to combine the two pieces
    // he wrote in that key. From there, he wrote the rest of the
    // movements. The climax of the fourth movement is what Crawford
    // considers to be his most beautiful piece of music. This piece
    // contains remarkably beautiful English Horn, Harp, Violin,
    // Trumpet, Horn, Low Strings, Clarinet, Piccolo and Oboe excerpts.
    // Fun Fact: this was the first piece of his others considered to have a
    // ‘modern’ style."],
    image: images.s6,
    youtube: {
      src: "https://www.youtube.com/watch?v=AFnC9JjtmLk",
      label:
        'Crawford Symphony 6 in Eb Major "World of Dreams" (Ver. 2.5) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-7",
    title: "Symph 7 in D minor",
    subtitle: "For Full Orchestra",
    year: "2024",
    type: "symphony",
    duration: "48:32",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "English Horn" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Horn in F I" +
      "\n" +
      "Horn in F III" +
      "\n" +
      "Horn in F II" +
      "\n" +
      "Horn in F IV" +
      "\n" +
      "Trumpet in Bb I" +
      "\n" +
      "Trumpet in Bb II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Bass Drum (changes to Tambourine movement III. and back to Bass Drum in the Finale)" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Viola [divisi (movement II. Only)]" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford wrote this symphony after discovering his new favorite
    // composer and finding two girls he loved. He was already
    // permanently heartbroken by one of them and still loved her. The
    // other girl spent the whole summer with her and her family. He
    // always loved hanging out with her although didn’t want to admit
    // his feelings for her. He unconsciously put out all of his romantic
    // frustrations and personal feelings into this symphony, making his
    // first truly romantic symphony. This symphony has fabulous
    // Strings, Clarinet, Bassoon, English Horn, Trumpet, Horn, Flute,
    // Piccolo, Crash Cymbal, and Timpani excerpts. Fun Fact: Crawford
    // likes to nickname this symphony his “P. Tchaikovsky Symphony”
    // due to the similarities this symphony has with Tchaikovsky’s
    // works."],
    image: images.s7,
    youtube: {
      src: "https://www.youtube.com/watch?v=E_5fbrpAbn8",
      label: "Crawford Symphony 7 in D Minor (Ver. 2) Full Score + Audio",
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-8",
    title: "Classical Symphony in C Major",
    subtitle: "For Full Orchestra",
    year: "2024",
    type: "symphony",
    duration: "42:04",
    scoring:
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet in C 1" +
      "\n" +
      "Trumpet in C 2" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford dedicated this symphony to Mozart, Hadyn and
    // Beethoven after discovering the classical era of and Beethoven's
    // time of music. He grew to especially love Beethoven's symphonies
    // and Mozart's style in his orchestration. He wanted to write a piece
    // mixing up the styles of Mozart, Haydn, Beethoven and
    // Tchaikovsky when he wrote this symphony. This symphony has
    // amazing Violin, Bassoon, Clarinet, Trombone, Tuba, Trumpet,
    // Horn, Flute, Oboe, and Low Strings Excerpts. Fun Fact: Crawford
    // chose the key C Major because while it is his least favorite key, he
    // considers it to be the most common key of the classical era."],
    image: images.s8,
    youtube: {
      src: "https://www.youtube.com/watch?v=BGxFkHx6FZo",
      label:
        'Crawford Symphony 8 in C Major "Classical Symphony" (Ver. 2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-9",
    title: "World of an Emotions in E Major",
    subtitle: "For Full Orchestra",
    year: "2024-2025",
    type: "symphony",
    duration: "1:05:57",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn in E 1" +
      "\n" +
      "Horn in E 2" +
      "\n" +
      "Horn in E 3" +
      "\n" +
      "Horn in E 4" +
      "\n" +
      "Trumpet in E 1" +
      "\n" +
      "Trumpet in E 2" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford’s Ninth Symphony was the first of his symphonies to
    // begin his “Depression Era” of his music. He wrote this after
    // accepting that his second love wouldn’t love him back and wrote
    // the finale about him realizing what he wanted to do with his love
    // life. He talked to himself while writing this symphony. He decided
    // to go for his first High School love, Elianny. While writing the
    // finale, he also wrote to himself musically and verbally how his
    // high school life has been so far. He vented how he felt about how
    // his life in general felt using Chorus throughout movements 1
    // through 3. He felt like his high school life was going to feel like a
    // Millennium, so he decided to make his longest movement yet (27,
    // almost 28 minute long movement). He dreams of the main melody
    // of the finale to be played at a Millennial celebration when the year
    // 3000 comes which would mark nine years before his 1000th
    // birthday. He calls it his “1000th birthday wish”.
    // This Symphony has miraculous Choral, Trumpet, Low Brass,
    // Violin, Flute, Piccolo, Oboe, Clarinet, Low Strings, and Timpani
    // Excerpts. Fun Fact: Crawford never wanted to listen to
    // Beethoven’s Ninth because it was a choral symphony. At the time
    // he never liked vocal music due to past events, which even involved
    // classical vocals. His mindset changed after he watched the movie
    // “Immortal Beloved”. He now puts Beethoven’s Ninth in his top
    // five favorite pieces and it had inspiration for the form of
    // Crawford’s Ninth.
    //  "],
    image: images.s9,
    youtube: {
      src: "https://www.youtube.com/watch?v=5ks79QPl71I",
      label:
        'Crawford Symphony 9 in E Major "World of Emotions"(Ver. 2) Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-10",
    title: "Excelsior in Bb major",
    subtitle: "For Full Orchestra",
    year: "2023-2025",
    type: "symphony",
    duration: "52:10",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Horn in F I" +
      "\n" +
      "Horn in F III" +
      "\n" +
      "Horn in F II" +
      "\n" +
      "Horn in F IV" +
      "\n" +
      "Trumpet in Bb I" +
      "\n" +
      "Trumpet in Bb II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Bass Drum" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" This Symphony is full of complete irony due to the purpose of the
    // piece and the outcome. Crawford wanted this piece to be the
    // happiest piece he wrote and he thought it wasn’t going to be hard
    // for him. It turns out making happy music wasn’t the easiest for a
    // depressed man. It took him 2 years to even make the first version
    // since he was never in a good enough mood to write more than 10
    // measures in a month. Despite this symphony supposedly being
    // Crawford's happiest work, it turned out to have one of his saddest
    // background stories to his music ever. This piece has Incredible
    // Oboe, Clarinet, Trumpet, Horn, Violin, Viola, Timpani, Low
    // Strings, Bassoon, Bass Trombone, and Tuba excerpts. Fun Fact: He
    // handwrote the first 2 movements and the manuscript book is
    // saved for a placement in a museum after he passes "],
    image: images.s10,
    youtube: {
      src: "https://www.youtube.com/watch?v=eGgRRBQHeoM",
      label:
        'Crawford Symphony 10 in Bb Major "Excelsior" (Ver. 2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-11",
    title: "F-Minor",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "symphony",
    duration: "1:04:33",
    scoring:
      "Piccolo (Flute III)" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Horn in F I" +
      "\n" +
      "Horn in F III" +
      "\n" +
      "Horn in F II" +
      "\n" +
      "Horn in F IV" +
      "\n" +
      "Trumpet in F I" +
      "\n" +
      "Trumpet in F II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford’s eleventh Symphony holds a dear place in Crawford's
    // heart. He considers this symphony to be one of his most emotional
    // symphonies he ever wrote, especially the first movement. This
    // movement is the first work to have his “Heartbroken Melody” in
    // it. He would unconsciously rewrite the same melody in different
    // keys in different pieces until he became conscious of it, giving the
    // melody the name it now has. This symphony would turn out to be
    // one of Crawford’s favorite symphonies of his. This Symphony has
    // beautiful Oboe, Flute, Bassoon, Low Brass, Trumpet, Violin, Viola,
    // Horns, Clarinet, and Piccolo Excerpts. Fun Fact: He wrote the
    // opening Idea of this symphony the same day he wrote the opening
    // idea to his tenth symphony and didn’t actually see it through until
    // 4 months later, finishing this symphony before he even finished his
    // tenth. This symphony is considered emotion since he wrote it
    // during his most heartbreaking moment in his life. "],
    image: images.s11,
    youtube: {
      src: "https://www.youtube.com/watch?v=xpG9zcUhZnc",
      label: "Crawford Symphony 11 in F Minor (Ver. 2) Full Score + Audio",
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-12",
    title: "Ballader og Marsjer in Eb Minor",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "symphony",
    duration: "59:40",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III" +
      "\n" +
      "Horn in Eb I" +
      "\n" +
      "Horn in Eb III" +
      "\n" +
      "Horn in Eb II" +
      "\n" +
      "Horn in Eb IV" +
      "\n" +
      "Trumpet in Eb I" +
      "\n" +
      "Trumpet in Eb II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Snare Drum" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford wrote this symphony when he had enough of all of the
    // obstacles he was going through in life and was ready to quit it all.
    // The catalyst was when he made a new friend. Making friends was
    // one of the few things he desired outside of his musical life.
    // Someone who liked her was jealous that he was going to steal her
    // away and personally came to him to threaten him. He told
    // Crawford to never hang with her again or he’ll be beaten up. He
    // was triggered by PTSD at that moment which prevented him from
    // telling him that the girl he liked wasn’t her, but her best friend.
    // He was already heartbroken from that previous heartbreak which
    // made him write the piece. The second movement is considered one
    // of Crawford’s most personal works. This piece has fabulous Oboe,
    // Flute, Bassoon, Clarinet, Piccolo, Strings, Trumpet, Horn, Low
    // Brass, and Snare Drum excerpts. Fun Fact: Even Crawford feels
    // ridiculous and sorry for string players for the string parts he
    // wrote, but he keeps it because it's what he wrote in that moment. "],
    image: images.s12,
    youtube: {
      src: "https://www.youtube.com/watch?v=EzpXrnZLbG8",
      label:
        'Crawford Symphony 12 in Eb Minor "Ballader og Marsjer" (Ver 2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-13",
    title: "Symphony 13 in G Minor",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "symphony",
    duration: "35:08",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet in C 1" +
      "\n" +
      "Trumpet in C 2" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford’s Thirteenth Symphony is Crawford's shortest
    // symphony. He wrote that symphony with the same influence he
    // used to write his eighth symphony after taking time to go back to
    // the classical era. This symphony is one of Crawford's ‘angry’
    // symphonies. He actually came up with this symphony when he
    // went fishing and it had gone wrong. He and his dad were there for
    // more than twelve hours and they caught no fish however others
    // around them including a four year old caught more than five fish.
    // This triggered him into writing his thirteenth symphony. This
    // symphony has amazing Violin, Bass, Cello, Bass Trombone,
    // Trumpet, Horn, Piccolo, Crash Cymbal, Snare Drum, Timpani,
    // Clarinet, and Bassoon excerpts. Fun Fact: The Finale was
    // originally going to be a Christmas Original that he was going to
    // make a one-man band performance of.
    //  "],
    image: images.s13,
    youtube: {
      src: "https://www.youtube.com/watch?v=Z-wRkqke_8k",
      label: "Crawford Symphony 13 in G Minor (Ver. 2) Full Score + Audio",
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-14",
    title: "Crawford Symphony 14 in E minor",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "symphony",
    duration: "44:41",
    scoring:
      "Piccolo (Movement III & IV Only)" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III (Movement II, III & IV Only)" +
      "\n" +
      "Horn in E I" +
      "\n" +
      "Horn in E III" +
      "\n" +
      "Horn in E II" +
      "\n" +
      "Horn in E IV" +
      "\n" +
      "Trumpet in E I" +
      "\n" +
      "Trumpet in E II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba (Movement I, II & IV Only)" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: ["Crawford’s fourteenth symphony is all about releasing stress and
    // anger. From enduring all of the pain and suffering to releasing it
    // all and destroying much more than a room. This form of this
    // symphony was inspired by Brahms Symphony 4. He never
    // considered adding hemiolas to his music. Since then he uses
    // hemiolas a lot in his compositions to define struggle, confusion
    // and stress. He also uses a ton of ‘key switches’ in the finale to
    // demonstrate the emotions he feels. This symphony was full of
    // emotions he was feeling at the moment. This symphony also
    // features his “Heartbroken Melody”. This Symphony has fantastic
    // Oboe, Violin, Flute, Bass, Cello, Viola, Bass Trombone, Tuba,
    // Clarinet, Horn, Bassoon, and Piccolo Excerpts. Fun Fact: This
    // symphony was Crawford's first popular work he’s made since
    // putting his music on social media."],
    image: images.s14,
    youtube: {
      src: "https://www.youtube.com/watch?v=57pcuw2A7BU&t",
      label: "Crawford Symphony 14 in E Minor (Ver. 2) Full Score + Audio",
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-15",
    title: "Anger Symphony in A minor",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "symphony",
    duration: "56:29",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Clarinet in A I" +
      "\n" +
      "Clarinet in A II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "English Horn (Oboe III)" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III" +
      "\n" +
      "Horn in D I" +
      "\n" +
      "Horn in D III" +
      "\n" +
      "Horn in D II" +
      "\n" +
      "Horn in D IV" +
      "\n" +
      "Horn in D V" +
      "\n" +
      "Horn in D VI" +
      "\n" +
      "Trumpet in A I" +
      "\n" +
      "Trumpet in A II" +
      "\n" +
      "Trumpet in A III" +
      "\n" +
      "Trumpet in A IV" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani (Second Part in Movement III & IV)" +
      "\n" +
      "Bass Drum" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Triangle (Movement I Only)" +
      "\n" +
      "Snare Drum (Movement I Only)" +
      "\n" +
      "Chimes (Movement IV Only)" +
      "\n" +
      "Suspended Cymbal (Movement I, III & IV Only)" +
      "\n" +
      "Tam-Tam (Movement I Only Shared with Sus. Cymbal)" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford’s fifteenth symphony holds a personal place in his heart.
    // This symphony is one of his works where almost every part of it
    // was full of original ideas. When he had the chance to finish
    // writing this symphony after writing down the opening idea, he
    // finished the symphony in 7 days. At the time when he wrote this
    // symphony, he was approaching the worst moments of his
    // childhood life. The first movement is full of emotional mood
    // swings that he was feeling at the moment. Crawford Symphony 15
    // is considered to be one of his most emotional symphonies. This
    // symphony has amazing Oboe, English horn, Low Brass, Cello,
    // Horn, Viola, Piccolo Violin, and trumpet excerpts. Fun Fact: This
    // symphony is in the key of A Minor because to Crawford, that key
    // defines Anger "],
    image: images.s15,
    youtube: {
      src: "https://www.youtube.com/watch?v=AoBOWbSS0vM",
      label:
        'Crawford Symphony 15 in A Minor "Anger Symphony" (Ver. 2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-16",
    title: "Funeral in C# Minor",
    subtitle: "For Full Orchestra",
    year: "2025",
    type: "symphony",
    duration: "55:32",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Clarinet I" +
      "\n" +
      "Clarinet II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "English Horn (Oboe III)" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III" +
      "\n" +
      "Horn in E I" +
      "\n" +
      "Horn in E III" +
      "\n" +
      "Horn in E II" +
      "\n" +
      "Horn in E IV" +
      "\n" +
      "Trumpet in E I" +
      "\n" +
      "Trumpet in E II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Bass Drum" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Triangle (Movement I, IV & V Only)" +
      "\n" +
      "Snare Drum (Movement IV Only)" +
      "\n" +
      "Chimes (Movement II & III Only)" +
      "\n" +
      "Vibraphone (Movement I & V Only)" +
      "\n" +
      "Marimba (Movement V Only)" +
      "\n" +
      "Soprano Vocal (Movement II & III Only)" +
      "\n" +
      "Alto Vocal (Movement II & III Only)" +
      "\n" +
      "Tenor Vocal (Movement II & III Only)" +
      "\n" +
      "Bass Vocal (Movement II & III Only)" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin I [divisi (movement V Only)]" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford’s Sixteenth Symphony is a piece full of features. It
    // features all kinds of emotional forms of classical music including
    // ‘Dies Irae’
    // ,
    // ‘Funeral March’ and more. This symphony also features
    // Crawford’s “Heartbroken Melody” in the finale. The finale of this
    // piece has a personal meaning to Crawford since this was his first
    // symphony after one of his most heartbreaking moments in his life.
    // At the time, all he wanted to do was just die, but of course he
    // never could do what it took to do so. In place, he wrote a
    // symphony of what he dreamt of in those days. This symphony has
    // beautiful Oboe, Flute, Cello, Viola, Trombone, trumpet, Bass
    // trombone, Violin, English horn, Piccolo, and Chorus excerpts. Fun
    // Fact: This symphony was finished before Symphony No. 15 was
    // born.
    //  "],
    image: images.s16,
    youtube: {
      src: "https://www.youtube.com/watch?v=w8M1T_ZyW6Y",
      label:
        'Crawford Symphony 16 in C# Minor "Funeral" (Ver. 2) Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-17",
    title: "Rebellion",
    subtitle: "For Full Orchestra",
    year: "2025-2026",
    type: "symphony",
    duration: "51:00",
    scoring:
      "Piccolo" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "Oboe III" +
      "\n" +
      "Clarinet in A I" +
      "\n" +
      "Clarinet in A II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III" +
      "\n" +
      "Contrabassoon" +
      "\n" +
      "Horn in F I" +
      "\n" +
      "Horn in F III" +
      "\n" +
      "Horn in F II" +
      "\n" +
      "Horn in F IV" +
      "\n" +
      "Horn in F V" +
      "\n" +
      "Horn in F VI" +
      "\n" +
      "Trumpet in F I" +
      "\n" +
      "Trumpet in F II" +
      "\n" +
      "Trumpet in C III" +
      "\n" +
      "Trumpet in C IV" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani I" +
      "\n" +
      "Timpani II" +
      "\n" +
      "Chimes" +
      "\n" +
      "Bass Drum" +
      "\n" +
      "Snare Drum" +
      "\n" +
      "Crash Cymbal" +
      "\n" +
      "Suspended Cymbal" +
      "\n" +
      "Tam-Tam" +
      "\n" +
      "Triangle" +
      "\n" +
      "Harp" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford’s Seventeenth Symphony is another personal symphony
    // featuring Crawford's “Heartbroken Melody”. This symphony is
    // about the rebellion His friends went through for several months.
    // His school band was falling apart and he was the only one fighting
    // for justice without causing war within the band. It got so bad that
    // in the end almost 20 of his peers quit the band. This ‘war’ in the
    // band went on for more than a whole year. This symphony has
    // extreme Violin, Flute, Bass, Cello, Trumpet, Viola, Low Brass,
    // Clarinet, Horn, Snare Drum, and English Horn, Harp, and
    // Bassoon excerpts. Fun Fact: This symphony was finished months
    // after the next symphony in line was finished "],
    image: images.s17,
    youtube: {
      src: "https://www.youtube.com/watch?v=iVKpdfAzy4Q",
      label: 'Crawford Symphony 17 "Rebellion" Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
  {
    slug: "syph-18",
    title: "Sinfonia Enfurecida in C Minor ",
    subtitle: "For Full Orchestra",
    year: "2025-2026",
    type: "symphony",
    duration: "1:04:58",
    scoring:
      "Piccolo I" +
      "\n" +
      "Piccolo II" +
      "\n" +
      "Flute I" +
      "\n" +
      "Flute II" +
      "\n" +
      "Oboe I" +
      "\n" +
      "Oboe II" +
      "\n" +
      "English Horn I" +
      "\n" +
      "English Horn II" +
      "\n" +
      "Clarinet in Bb I" +
      "\n" +
      "Clarinet in Bb II" +
      "\n" +
      "Clarinet in Eb I" +
      "\n" +
      "Clarinet in Eb II" +
      "\n" +
      "Bassoon I" +
      "\n" +
      "Bassoon II" +
      "\n" +
      "Bassoon III (Contrabassoon Mvt IV)" +
      "\n" +
      "Horn in Eb I" +
      "\n" +
      "Horn in Eb III" +
      "\n" +
      "Horn in Eb II" +
      "\n" +
      "Horn in Eb IV" +
      "\n" +
      "Horn in Eb V" +
      "\n" +
      "Horn in Eb VI" +
      "\n" +
      "Trumpet in Eb I" +
      "\n" +
      "Trumpet in Eb II" +
      "\n" +
      "Trumpet in Bb I" +
      "\n" +
      "Trumpet in Bb II" +
      "\n" +
      "Trombone I" +
      "\n" +
      "Trombone II" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani I" +
      "\n" +
      "Timpani II" +
      "\n" +
      "Chimes" +
      "\n" +
      "Snare Drum" +
      "\n" +
      "Bass Drum" +
      "\n" +
      "Crash/Suspended Cymbal" +
      "\n" +
      "Triangle" +
      "\n" +
      "Tambourine/Tam-Tam" +
      "\n" +
      "Harp" +
      "\n" +
      "Violin I" +
      "\n" +
      "Violin II" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    //     description: [" Crawford made this symphony specifically for a Juilliard
    // Pre-college audition, although it didn’t help him get in. While this
    // symphony was made for college reasons, this symphony still has
    // personal things to him. The first movement is full of released
    // anger that Crawford held on for months. This was the first
    // symphony he made after the worst moment of his childhood life.
    // The last 6 minutes of this symphony is Crawford finally destroying
    // his room letting out all of his enraged fury. This Symphony has
    // remarkably miraculous Oboe, Flute, Piccolo, Low Brass, Snare
    // Drum, Low Strings, Horn, Contrabassoon, Timpani, Trumpet,
    // English Horn, Viola, Bassoon, and Violin excerpts. Fun Fact:
    // Crawford chose the key of C Minor because it represents “Cruel”
    // ,
    // “Crazy” and “Chaotic”. "],
    image: images.s18,
    youtube: {
      src: "https://www.youtube.com/watch?v=QbuGfllpqqI",
      label:
        'Crawford Symphony 18 in C Minor "Sinfonia Enfurecida" Full Score + Audio',
    },
    // purchaseUrl: "https://www.google.com",
  },
];

//------- Achievements -------

export type AchievementType = "award" | "performance";
export const achievementTypeLabels: Record<AchievementType, string> = {
  award: "Awards",
  performance: "Performances",
};

export type Achievement = {
  id: string;
  year: string;
  type: AchievementType;
  title: string;
  organization?: string;
  detail?: string;
  href?: string;
};

export const achievements: Achievement[] = [
  {
    id: "premiere-tidewater",
    year: "2025",
    type: "performance",
    title: "Premiere of Tidewater",
    organization: "Placeholder Symphony Orchestra",
    detail: "Placeholder Hall — first performance of the complete work.",
  },
  {
    id: "commission-tidewater",
    year: "2024",
    type: "award",
    title: "Orchestral commission",
    organization: "Placeholder Symphony Orchestra",
    detail: "Commissioned to write a large-scale work for the 2025 season.",
  },
  {
    id: "award-emerging-composer",
    year: "2024",
    type: "award",
    title: "Emerging Composer Prize",
    organization: "Placeholder Foundation",
  },
  {
    id: "residency-2024",
    year: "2024",
    type: "award",
    title: "Composer in residence",
    organization: "Placeholder Arts Center",
    detail: "A season-long residency including two new commissions.",
  },
  {
    id: "premiere-three-elegies",
    year: "2024",
    type: "performance",
    title: "Premiere of Three Elegies",
    organization: "Placeholder Quartet",
  },
  {
    id: "performance-still-hour",
    year: "2023",
    type: "performance",
    title: "The Still Hour performed on tour",
    organization: "Placeholder Chamber Choir",
  },
  {
    id: "award-choral-competition",
    year: "2023",
    type: "award",
    title: "First prize, choral composition competition",
    organization: "Placeholder Choral Society",
  },
  {
    id: "press-review-2022",
    year: "2022",
    type: "performance",
    title: "Featured in a review of new orchestral writing",
    organization: "Placeholder Review",
  },
];

//------- Featured images -------

export type FeaturedImage = {
  id: string;
  src: string | null;
  alt: string;
};

export const featuredImages: FeaturedImage[] = [
  {
    id: "hero-rotation-1",
    src: images.orch2,
    alt: "Zachary Crawford, photograph one",
  },
  {
    id: "hero-rotation-2",
    src: images.comp,
    alt: "Zachary Crawford, photograph two",
  },
  {
    id: "hero-rotation-3",
    src: images.car,
    alt: "Zachary Crawford, photograph three",
  },
  {
    id: "hero-rotation-4",
    src: images.solo,
    alt: "Zachary Crawford, photograph four",
  },
  {
    id: "hero-rotation-5",
    src: images.orch,
    alt: "Zachary Crawford, photograph five",
  },
  {
    id: "hero-rotation-6",
    src: images.bandRoom,
    alt: "Zachary Crawford, photograph six",
  },
  {
    id: "hero-rotation-7",
    src: images.all,
    alt: "Zachary Crawford, photograph seven",
  },
];
