import { useEffect, useState } from "react";
import { publicIp } from "public-ip";
import { useTranslation } from "react-i18next";
import PromImage from "../../assets/images/Prom_logo.png";
import UserIcon from '../../assets/images/user-icon-counter.png';
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor's IP address
        const ipAddress = await publicIp();

        // Get existing visitors from localStorage
        const visitors = JSON.parse(localStorage.getItem("visitors") || "[]");

        // Check if this IP has visited before
        if (!visitors.includes(ipAddress)) {
          // Add new IP to the list
          visitors.push(ipAddress);
          localStorage.setItem("visitors", JSON.stringify(visitors));
        }

        // Update visitor count based on unique IPs
        setVisitorCount(visitors.length);
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    trackVisitor();
  }, []); // Run once on component mount

  return (
    <footer className="bg-black text-white mt-16 flex flex-col items-center justify-center p-[20px]">
      {/* <h3 className="text-xl font-bold mb-4 mt-8">{t("company-nane")}</h3> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="flex flex-col items-center w-full justify-center">
            <h4 className="text-lg font-semibold mb-4">
              {t("footer-contact-title")}
            </h4>
            <div className="flex flex-row items-center justify-center w-full gap-[50px]">
              <ul className="space-y-2 text-gray-300 w-[250px]">
                <li className="font-semibold">{t("footer-contact-otp-plants-title")}</li>
                <li>{t("footer-email-title")} novosadsm@ukr.net</li>
                <li>{t("footer-phone-title")} +38 050 378 24 72</li>
                <li className="font-semibold">{t("novosad-contact-sm-full-name")}</li>
              </ul>
              <ul className="space-y-2 text-gray-300 w-[250px]">
                <li className="font-semibold">{t("footer-contact-single-plant-title")}</li>
                <li>{t("footer-email-title")} novosadsm@ukr.net</li>
                <li>{t("footer-phone-title")} +38 050 036 32 90,<br/>+38 068 065 40 11</li>
                <li className="font-semibold">{t("novosad-contact-sm-full-name")}</li>
              </ul>
              <ul className="space-y-2 text-gray-300 w-[250px]">
                <li className="font-semibold">{t("footer-contact-security-plant-title")}</li>
                <li>{t("footer-email-title")} novosadss@ukr.net</li>
                <li>{t("footer-phone-title")} +380 99 736 13 08</li>
                <li className="font-semibold">{t("novosad-contact-ss-full-name")}</li>
              </ul>
              <ul className="space-y-2 text-gray-300 w-[250px]">
                <li className="font-semibold">{t("footer-contact-boilerplates-title")}</li>
                <li>{t("footer-email-title")} ira_novosad@ukr.net</li>
                <li>{t("footer-phone-title")} +38 095 220 03 53</li>
                <li className="font-semibold">{t("novosad-contact-is-full-name")}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-row items-center justify-around">
          <div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-200">
                {t("footer-unique-visitors")}
              </p>
              <div className="flex flex-row justify-between items-center p-[5px]">
              <h4 className="text-2xl font-bold text-agro-DEFAULT">
                {visitorCount}
              </h4>
              <img width="30" height="30" src={UserIcon} alt="user--v1"/>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer-address-title")}
            </h4>
            <ul className="space-y-2 text-gray-300 w-[250px]">
              <li>{t("footer-address-content")}</li>
            </ul>
          </div>
          <div>
            <p>{t("footer-social-media-title")}</p>
            <ul className="flex flex-row gap-[10px] items-center mt-[20px]">
              <li>
                <Link to="/">
                <img
                  src={PromImage}
                  alt="novosad.prom.ua"
                  className="bg-white w-[120px] rounded-lg p-[6px]"
                /></Link>
              </li>
              <li>
                <Link to="/">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/facebook-new.png"
                  alt="facebook-new"
                /></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 flex flex-row items-center justify-between">
          <p>
            &copy; {new Date().getFullYear()} {t("company-nane")}.{" "}
            {t("all-copy-secured-footer-title")}.
          </p>
          <p>{t("footer-dev-by-title")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
