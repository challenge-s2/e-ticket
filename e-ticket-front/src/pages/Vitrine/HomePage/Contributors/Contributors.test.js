import { render, waitFor, screen } from "@testing-library/react";
import Contributors from "./Contributors"
import bpi from "../../../../utils/assets/logo-bpi.svg"
import cegid from "../../../../utils/assets/logo-cegid.svg"
import laruche from "../../../../utils/assets/logo-laruche.svg"
import sista from "../../../../utils/assets/logo-sista.svg"
import stationf from "../../../../utils/assets/logo-bpi.svg"
import wilco from "../../../../utils/assets/logo-wilco.svg"

const content = [
    {
      key: 1,
      img: bpi,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 2,
      img: cegid,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 3,
      img: laruche,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 4,
      img: sista,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 5,
      img: stationf,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 6,
      img: wilco,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 7,
      img: laruche,
      alt: "image of the activity sector to choose",
      link: "",
    },
    {
      key: 8,
      img: sista,
      alt: "image of the activity sector to choose",
      link: "",
    },
];

test("List renders successfully", () => {
    render(<Contributors data={content} />)
    expect(content).toHaveLength(8);
});

test("Fastfood in list renders", () => {
    render(<Contributors data={content} displayUnorderedList={false} />)
    expect(screen.findAllByText(/activity/i))
})
