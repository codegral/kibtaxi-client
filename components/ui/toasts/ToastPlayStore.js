import Image from "next/image";
import Toast from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ToastPlayStore = ({ show, handleClosePlayStoreToast }) => (
  <Toast show={show}>
    <Toast.Header className={"flex items-center"}>
      <section className="flex items-center gap-3">
        <Image
          src={"/logo.png"}
          width={1024}
          height={8}
          className="w-7"
          alt="Kibtaxi Logo"
        />
        <h1 className="font-semibold text-xl">Kıbtaxi</h1>
      </section>
      <section className="ms-auto">
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="cursor-pointer text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white transition-all"
          onClick={handleClosePlayStoreToast}
        />
      </section>
    </Toast.Header>
    <Toast.Body className={"my-4"}>
      <p className="text-muted dark:text-muted-dark line-clamp-2 lg:line-clamp-none text-sm">
        To find Kıbrıs Taksi and KKTC taksi with their reviews, photos, and
        contact options, the best way to use our mobile app.
      </p>
    </Toast.Body>
    <Toast.Footer>
      <Link
        href={
          "https://play.google.com/store/apps/details?id=com.kibtaxi.kibtaxi"
        }
        target="_blank"
      >
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
          }
          width={2569}
          height={759}
          className="w-32 cursor-pointer hover:opacity-75 transition-all"
          alt="Get it on Play Store"
        />
      </Link>
    </Toast.Footer>
  </Toast>
);

export default ToastPlayStore;
