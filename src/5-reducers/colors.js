

const initialState = {
    colors : [
        "#F54423",
        "#0AD010",
        "#158DE8",
        "#7607AD",
        "#F5680A",
        "#F2495F",
        "#4C43F1",
        "#F20349",
        "#BC0349",
        "#36C378" , 
        "#292929",
        "#2446E0",
        "#2DAD34",
        "#EDA41A",
        "#F71E1B",
        "#24C4E0",
    ],
    name:"ayoub"
}

export default function (state=initialState , action)
{
    const {type , paylaod} = action ; 
    switch(type)
    {
        default : return state;
    }
}