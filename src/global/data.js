export const filterData = [
    { name: "Algarve", image: require('../../assets/Algarve.png'), id: "0" },
    { name: "Lisboa", image: require('../../assets/Lisboa.png'), id: "1" },
    { name: "Porto", image: require('../../assets/Porto.png'), id: "2" },
];

export const filterData2 = [
    { name: "Para o Bebé", image: require('../../assets/baby.png'), id: "0" },
    { name: "Para a Mulher", image: require('../../assets/woman.png'), id: "1" },
    { name: "Para o Homem", image: require('../../assets/man.png'), id: "2" },
    { name: "Cremes", image: require('../../assets/cream.png'), id: "3" },
    { name: "Anti-Inflamatorios", image: require('../../assets/pills.png'), id: "4" },
    { name: "Vida Sexual", image: require('../../assets/sex.png'), id: "5" },
    { name: "Covid-19", image: require('../../assets/mask.png'), id: "6" },
    { name: "Nutrição", image: require('../../assets/salad.png'), id: "7" },
];

// productData.filter(product => product.categoria === nome q ta la em cima no menu or smth like that)

export const dataFarmacias = [
    {
        farmaciaName: "Farmacia 1", distancia: "23",
        farmaciaMorada: "", images: '',
        coordenadas: {}, tempoEntrega: 10, tempoRecolha: 5,
        productData: [
            { name: "Brufen 200mg x 20 Comprimidos", categoria: "Anti-Inflamatorios", price: 5, image: "" },
            { name: "Ben-u-ron 500mg x 20 Cápsulas", categoria: "Anti-Inflamatorios", price: 3.10, image: "", },
            { name: "Control Preservativo Retard x 12 Unidades", categoria: "Vida Sexual", price: 7, image: "" },
            { name: "Chicco Chupeta Soft Latex 0.6 Meses", categoria: "Para o Bebé", price: 4, image: "" }
        ],
        id: 0
    },
    {
        farmaciaName: "Farmacia 2", distancia: "60",
        farmaciaMorada: "", images: '',
        coordenadas: {}, tempoEntrega: 10, tempoRecolha: 5,
        productData: [
            { name: "Brufen 200mg x 20 Comprimidos", categoria: "Anti-Inflamatorios", price: 5, image: "" },
            { name: "Ben-u-ron 500mg x 20 Cápsulas", categoria: "Anti-Inflamatorios", price: 3.10, image: "", },
            { name: "Control Preservativo Retard x 12 Unidades", categoria: "Vida Sexual", price: 7, image: "" },
            { name: "Chicco Chupeta Soft Latex 0.6 Meses", categoria: "Para o Bebé", price: 4, image: "" }
        ],
        id: 1
    },
    {
        farmaciaName: "Farmacia 3", distancia: "200",
        farmaciaMorada: "", images: '',
        coordenadas: {}, tempoEntrega: 10, tempoRecolha: 5,
        productData: [
            { name: "Brufen 200mg x 20 Comprimidos", categoria: "Anti-Inflamatorios", price: 5, image: "" },
            { name: "Ben-u-ron 500mg x 20 Cápsulas", categoria: "Anti-Inflamatorios", price: 3.10, image: "", },
            { name: "Control Preservativo Retard x 12 Unidades", categoria: "Vida Sexual", price: 7, image: "" },
            { name: "Chicco Chupeta Soft Latex 0.6 Meses", categoria: "Para o Bebé", price: 4, image: "" }
        ],
        id: 2
    },
    {
        farmaciaName: "Farmacia 4", distancia: "134",
        farmaciaMorada: "", images: '',
        coordenadas: {}, tempoEntrega: 10, tempoRecolha: 5,
        productData: [
            { name: "Brufen 200mg x 20 Comprimidos", categoria: "Anti-Inflamatorios", price: 5, image: "" },
            { name: "Ben-u-ron 500mg x 20 Cápsulas", categoria: "Anti-Inflamatorios", price: 3.10, image: "", },
            { name: "Control Preservativo Retard x 12 Unidades", categoria: "Vida Sexual", price: 7, image: "" },
            { name: "Chicco Chupeta Soft Latex 0.6 Meses", categoria: "Para o Bebé", price: 4, image: "" }
        ],
        id: 3
    },
];