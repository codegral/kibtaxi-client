import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";
import { useQuery } from "react-query";
import HttpRequest from "@/utils/HttpRequest";
import { v4 } from "uuid";
import Spinner from "../Spinner";

const ModalCity = ({ show, handleCloseModal }) => {
  const [cities, setCities] = useState(null);

  const { isLoading: isCitiesLoading } = useQuery({
    queryKey: "getCitiesModalCity",
    queryFn: async function () {
      const response = await HttpRequest.get(
        `cities/?API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      return response.data;
    },
    onSuccess: function (data) {
      setCities(data.cities);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Modal
      show={show}
      handleCloseModal={handleCloseModal}
      className={"!w-1/3 py-2 !rounded-2xl"}
    >
      <Modal.Header>
        <h6 className="text-center font-bold">Select City</h6>
      </Modal.Header>
      <hr
        style={{ height: 0.5 }}
        className="border-none bg-border dark:bg-border-dark my-2"
      />
      <Modal.Body>
        <ul className="text-center">
          {isCitiesLoading && (
            <center>
              <Spinner />
            </center>
          )}
          {!isCitiesLoading &&
            cities?.length >= 1 &&
            cities?.map((city) => (
              <li key={v4()}>
                <Link
                  href={`/city/${city.city_name}?lat=${city.city_coordinates.coordinates[1]}&long=${city.city_coordinates.coordinates[0]}`}
                  className="block rounded py-2.5 hover:bg-light hover:dark:bg-black transition-all"
                  onClick={handleCloseModal}
                >
                  {city.city_name}
                </Link>
              </li>
            ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCity;
