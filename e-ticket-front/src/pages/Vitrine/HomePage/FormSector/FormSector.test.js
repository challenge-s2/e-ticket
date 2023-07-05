import { render, waitFor, screen } from "@testing-library/react";
import FormSector from "./FormSector"

const content = [
    {
        key: 1,
        name: "Fastfood",
        img: "https://placehold.co/400",
        alt: "image of the activity sector to choose",
        link: "",
    },
    {
        key: 2,
        name: "Institut de beauté",
        img: "https://placehold.co/400",
        alt: "image of the activity sector to choose",
        link: "",
    },
    {
        key: 3,
        name: "Vente d'eCigarette",
        img: "https://placehold.co/400",
        alt: "image of the activity sector to choose",
        link: "",
    },
    {
        key: 4,
        name: "Boulangerie/Patisserie",
        img: "https://placehold.co/400",
        alt: "image of the activity sector to choose",
        link: "",
    },
    {
        key: 5,
        name: "Autre",
        img: "https://placehold.co/400",
        alt: "image of the activity sector to choose",
        link: "",
    },
];

test("List renders successfully", () => {
    render(<FormSector data={content} />)
    expect(content).toHaveLength(5);
});
