export const superheroStub = () => ({
    id: 7,
    nickname: "Superman",
    real_name: "Clark Kent",
    origin_description: "he was born Kal-El on the planet Krypton, before being rocketed to\r\nEarth as an infant by his scientist father Jor-El, moments before Krypton's destruction…",
    superpowers: "solar energy absorption and healing factor, solar flare and heat vision,\r\nsolar invulnerability, flight…",
    catch_phrase: "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
    images: "f9a3d254-77b6-475b-bc2e-3193d538196d.jpg;",
    main_image: "f9a3d254-77b6-475b-bc2e-3193d538196d.jpg",
    author_id: 4,
    createdAt: "2022-08-08T17:24:40.974Z",
    updatedAt: "2022-08-08T17:24:40.974Z",
    followers: []
})

export const getAllStub = () => ({
    count:1,
    rows:[superheroStub()]
})