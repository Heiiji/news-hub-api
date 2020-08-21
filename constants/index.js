module.exports.threads = [
    {
        id: "1",
        name: "l'observé",
        description: "un truc ou on a de l'actu",
        language: "fr",
        image: "https://cdn.pixabay.com/photo/2015/08/13/01/00/keyboard-886462_960_720.jpg",
        domain: "https://truc.fr",
        url: "http://truc.fr/tes.rss",
        httpStatus: 200,
        private: true,
        subscribersId: ["1"]
    },
    {
        id: "2",
        name: "l'observé 2",
        description: "un truc ou on a de l'actu 22",
        language: "fr",
        image: "https://cdn.pixabay.com/photo/2015/08/13/01/00/keyboard-886462_960_720.jpg",
        domain: "https://truc.fr",
        url: "http://truc.fr/tes.rss",
        httpStatus: 404,
        private: true,
        subscribersId: []
    }
];

module.exports.users = [
    {
        id: "1",
        name: "patrick",
        email: "patrick@gmail.com",
        subscriptionsId: ["1"]
    },
    {
        id: "2",
        name: "eve",
        email: "eve@gmail.com",
        subscriptionsId: []
    }
];