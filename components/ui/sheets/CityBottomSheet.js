import { useState } from "react";
import BottomSheet from "./BottomSheet";
import { useQuery } from "react-query";
import HttpRequest from "@/utils/HttpRequest";
import Link from "next/link";
import { v4 } from "uuid";
import Spinner from "../Spinner";

const CityBottomSheet = ({ show, handleCloseBottomSheet }) => {
  const [cities, setCities] = useState(null);

  const { isLoading: isCitiesLoading } = useQuery({
    queryKey: "getCitiesBottomSheet",
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
    <BottomSheet show={show} handleCloseBottomSheet={handleCloseBottomSheet}>
      <section
        id="select-city-bottomsheet"
        className="max-h-[250px] overflow-y-scroll"
      >
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
                  onClick={handleCloseBottomSheet}
                >
                  {city.city_name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </BottomSheet>
  );
};

export default CityBottomSheet;
