import Aside from "@/components/ui/Aside";
import Button from "@/components/ui/Button";
import CardTaxi from "@/components/ui/Cards/CardTaxi";
import ModalCity from "@/components/ui/modals/ModalCity";
import ModalTaxi from "@/components/ui/modals/ModalTaxi";
import CityBottomSheet from "@/components/ui/sheets/CityBottomSheet";
import TaxiBottomSheet from "@/components/ui/sheets/TaxiBottomSheet";
import HttpRequest from "@/utils/HttpRequest";
import {
  faAngleDown,
  faLocation,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useState } from "react";
import { v4 } from "uuid";

const CityPage = ({ city, popular_taxis, taxis }) => {
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [modal, setModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [selectCityModal, setSelectCityModal] = useState(false);
  const [selectCityBottomSheet, setSelectCityBottomSheet] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleOpenBottomSheet = () => setBottomSheet(true);
  const handleCloseBottomSheet = () => setBottomSheet(false);

  const handleOpenSelectCityModal = () => setSelectCityModal(true);
  const handleCloseSelectCityModal = () => setSelectCityModal(false);

  const handleOpenSelectCityBottomSheet = () => setSelectCityBottomSheet(true);
  const handleCloseSelectCityBottomSheet = () =>
    setSelectCityBottomSheet(false);

  function handleSelectTaxi(taxi) {
    setSelectedTaxi(taxi);

    if (typeof window !== "undefined" && window.innerWidth >= 992)
      handleOpenModal();
    else if (typeof window !== "undefined" && window.innerWidth < 992)
      handleOpenBottomSheet();
  }

  function handleUnselectTaxi() {
    const identifier = setTimeout(function () {
      setSelectedTaxi(null);
    }, 200);

    handleCloseModal();
    handleCloseBottomSheet();

    return () => clearTimeout(identifier);
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`${city} taxi, Kibtaxi KKTC ve Kuzey Kıbrıs'ın Taksi Uygulaması | Kıbrıs Taxi | Kıbrıs taksi`}
        />
        <meta
          name="keywords"
          content={`${city} taxi, ${city} taksi, kibtaxi, kktc taksi, kıbrıs taksi, kktc taxi, trnc taxi, trnc taksi, north cyprus taxi, north cyprus taksi, mağusa taksi, famagusta taxi, magosa taksi, girne taksi, kyrenia taksi, kyrenia taxi, nicosia taksi, nicosia taxi, ercan taksi, lefkoşa taksi`}
        />
        <title>
          {city} Taxi's | Kibtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve
          Kuzey Kıbrıs'ın KKTC Taksi Uygulaması
        </title>
      </Head>
      <section id="app" className="flex items-start">
        <Aside
          popular_taxis={popular_taxis}
          city={city}
          handleSelectTaxi={handleSelectTaxi}
        />
        <section id="app-main" className="p-4">
          <section className="lg:hidden lg:mb-0 mb-4">
            <section className="flex items-center justify-between mb-3">
              <h6 className="flex items-center gap-2 font-semibold line-clamp-1">
                <FontAwesomeIcon icon={faRocket} className="text-primary" />
                <span className="line-clamp-1">Most popular, {city}</span>
              </h6>
              <Button
                type={"button"}
                className={
                  "flex items-center gap-2 text-primary hover:text-primary-darker !rounded-none !shadow-none !px-0"
                }
                onClick={handleOpenSelectCityBottomSheet}
              >
                <span className="line-clamp-1">{city?.slice(0, 10)}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </section>
            <section>
              <ul
                id="popular-taxis"
                className="flex items-center gap-6 overflow-x-scroll snap-mandatory snap-x"
              >
                {popular_taxis?.map((popular_taxi) => (
                  <li className="min-w-[90%] snap-start snap-always" key={v4()}>
                    <CardTaxi
                      taxi={popular_taxi}
                      handleSelectTaxi={handleSelectTaxi}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </section>
          <br className="lg:hidden" />
          <section>
            <section className="flex items-center lg:items-start justify-between mb-3 lg:mb-1">
              <h6 className="flex items-center gap-2 font-semibold">
                <FontAwesomeIcon icon={faLocation} className="text-primary" />
                <span>Other taxis around you</span>
              </h6>
              <Button
                type={"button"}
                className={
                  "hidden lg:flex items-center gap-2 text-primary hover:text-primary-darker !rounded-none !shadow-none !px-0"
                }
                onClick={handleOpenSelectCityModal}
              >
                <span className="line-clamp-1">{city?.slice(0, 10)}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </section>
            <section>
              <ul className="grid grid-cols-12 gap-6 items-center">
                {taxis?.map((taxi) => (
                  <li className="col-span-12 lg:col-span-6" key={v4()}>
                    <CardTaxi taxi={taxi} handleSelectTaxi={handleSelectTaxi} />
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </section>
      </section>
      <ModalCity
        show={selectCityModal}
        handleCloseModal={handleCloseSelectCityModal}
      />
      <ModalTaxi
        show={modal}
        handleCloseModal={handleUnselectTaxi}
        taxi={selectedTaxi}
      />
      <CityBottomSheet
        show={selectCityBottomSheet}
        handleCloseBottomSheet={handleCloseSelectCityBottomSheet}
      />
      <TaxiBottomSheet
        show={bottomSheet}
        handleCloseBottomSheet={handleUnselectTaxi}
        taxi={selectedTaxi}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { cityName: city, lat, long } = query;

  const response = await HttpRequest.get(
    `taxis?lat=${lat}&long=${long}&pt=5&API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const { popular_taxis, taxis } = response.data;

  return {
    props: {
      city,
      popular_taxis,
      taxis,
    },
  };
}

export default CityPage;
