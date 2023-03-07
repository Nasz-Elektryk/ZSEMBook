import React, {useRef} from 'react';
import LinkSection from '../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './Sidebar.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Searchbar from '../Components/Searchbar';
import getUserObject from '../Lib/getUser';

const Sidebar = () => {
    let user: any;
    // @ts-ignore
    user = getUserObject("user_info");

    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const logout = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            credentials: "include",
        })
            .then((response) => response.text())
            .then(() => {
                NotificationManager.success("Udało się wylogować.", "Wylogowano", 3000);
                navigate("/auth/login")
            })
            .catch((error) => console.log("error", error));
    }

    return (
      <>
        <div className={classes.navbar} ref={ref}>
          <div className={classes.mainLogo}>
            <NavLink to="/">
              <h1>ZSEMBook</h1>
            </NavLink>
          </div>
          <div>
            <Searchbar
              link={{ label: "Szukaj", icon: <Icon.Search /> }}
              forwardedRef={ref}
            />
            <LinkSection
              elements={[
                {
                  destination: "/spotted",
                  label: "Spotted",
                  icon: <Icon.PeopleFill />,
                },
                {
                  destination: "https://zsem.edu.pl/rekrutacja%202023/2024",
                  label: "Oferta",
                  icon: <Icon.FolderFill />
                },
                {
                  destination: "/events",
                  label: "Eventy",
                  icon: <Icon.CardChecklist />,
                },
                {
                  destination: "/chat",
                  label: "Komunikator",
                  icon: <Icon.Chat />,
                },
                {
                  destination: "/walk",
                  label: "Szkoła",
                  icon: <Icon.BuildingFill />,
                },
                {
                  destination: "/faq",
                  label: "FAQ",
                  icon: <Icon.QuestionCircleFill />,
                },
              ]}
            />
          </div>
          <div>
            <LinkSection
              elements={[
                {
                  destination: `/profile/${user.id}`,
                  label: "Profil",
                  icon: <Icon.PersonCircle />,
                },
                {
                  destination: "/settings",
                  label: "Ustawienia",
                  icon: <Icon.Tools />,
                },
                {
                  label: "Wyloguj się",
                  icon: <Icon.DoorOpen />,
                  onClick: logout,
                },
              ]}
            />
          </div>
        </div>
      </>
    );
}

export default Sidebar;
