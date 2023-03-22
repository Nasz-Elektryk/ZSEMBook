import React, { ChangeEvent, useEffect, useState } from "react";
import classes from "./Settings.module.css";
import Section from "../../Layout/Section";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import defaultAvatar from "./Graphics/default.png";
import { getTheme, toggleTheme } from "../../Lib/Theme";
import {
  BrightnessHighFill,
  MoonFill,
  PencilFill,
  CheckSquareFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const Settings = () => {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(getTheme());
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    avatar: new File([new Blob()], "avatar"),
    username: "",
    email: "",
    name: "",
    surname: "",
    facebook: "",
    instagram: "",
    youtube: "",
    website: "",
    profileDesc: "",
    darkTheme: false,
  });


  async function getSettings() {
    setIsLoading(true);
    try {
      await fetch("http://localhost:3000/user/settings/get", {
        method: "GET",
        credentials: "include",
      })
        .then(res => res.json())
        .then(json => JSON.parse(JSON.stringify(json).replace(/null/gi, "\"\"")))
        .then(data => setSettings(data))
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const updateTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
    return;
  };

  async function updateSettings(event: any) {
    event.preventDefault();
    const filteredSettings = Object.fromEntries(Object.entries(settings).filter(([_, v]) => v !== ""));
    const throwObject = {};
    fetch(
      "http://localhost:3000/user/settings/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(filteredSettings),
      }
    )
      .then((res) => res.text())
      .then(() => setIsLoading(true))
      .then(() => {
        NotificationManager.success(
          "Udało się zaktualizować ustawienia.",
          "Sukces!",
          3000
        );
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        return throwObject;
      });
  }

  const handleUserNameChange = (event: any) => {
    setSettings({
      ...settings,
      username: event.target.value,
    });
  };
  const handleFacebookChange = (event: any) => {
    setSettings({
      ...settings,
      facebook: event.target.value,
    });
  };
  const handleInstagramChange = (event: any) => {
    setSettings({
      ...settings,
      instagram: event.target.value,
    });
  };
  const handleYTChange = (event: any) => {
    setSettings({
      ...settings,
      youtube: event.target.value,
    });
  };
  const handleWebsiteChange = (event: any) => {
    setSettings({
      ...settings,
      website: event.target.value,
    });
  };
  const handleDescChange = (event: any) => {
    setSettings({
      ...settings,
      profileDesc: event.target.value,
    });
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files)
    setSettings({
      ...settings,
      avatar: new File([event.target.files[0]], "avatar", {type: 'image/jpg'}),
    });
  }

  useEffect(() => {
    getSettings();
  }, []);
  return (
    <>
      {!isLoading && (
        <>
          <Section>
            <h2>Profil</h2>
            <div className={classes.twoInputs}>
              <Input
                placeholder="Nazwa użytkownika"
                value={settings.username}
                onChange={handleUserNameChange}
              />
              <Button buttonText="Zmień hasło" />
            </div>
            <div className={classes.twoInputs}>
              <Input
                placeholder="Nazwa użytkownika na facebooku"
                value={settings.facebook}
                onChange={handleFacebookChange}
              />
              <Input
                placeholder="Nazwa użytkownika na instagramie"
                value={settings.instagram}
                onChange={handleInstagramChange}
              />
            </div>
            <div className={classes.twoInputs}>
              <Input
                placeholder="Nazwa kanału na youtubeie"
                value={settings.youtube}
                onChange={handleYTChange}
              />
              <Input
                placeholder="Link do strony internetowej"
                value={settings.website}
                onChange={handleWebsiteChange}
              />
            </div>
            <div className={classes.twoInputs}>
              <div className={classes.inputHolder}>
                <Textarea
                  placeholder="Opis profilu"
                  value={settings.profileDesc}
                  onChange={handleDescChange}
                />
              </div>
              <div className={classes.inputHolder}>
                <label htmlFor="avatarUploader" className={classes.avatar}>
                  <span className={`${classes.coverer} ${classes.hidden}`}>
                    <PencilFill className={classes.covererIcon} />
                  </span>
                  <img className={classes.avImage} src={defaultAvatar} alt="" />
                </label>
              </div>
              <input type="file" id="avatarUploader" className={classes.invisible} onChange={handleAvatarChange}/>
            </div>
          </Section>
          <Section>
            <h2>Preferencje</h2>
            <div className={classes.inliner}>
              <div className={classes.switchContainer} onClick={updateTheme}>
                <div className={classes.themeSwitch}>
                  <div
                    className={`${classes.ballWrapper} ${
                      darkTheme ? classes.right : classes.left
                    }`}
                  >
                    <BrightnessHighFill
                      className={!darkTheme ? classes.current : ""}
                    />
                    <MoonFill className={darkTheme ? classes.current : ""} />
                  </div>
                </div>
                <label className={classes.label}>Ciemny motyw</label>
              </div>
            </div>
          </Section>
          <Section>
            <h2>Konto</h2>
            <div className={classes.bottomButtons}>
              <Button buttonText="Usuń konto" className="alternate" />
              <Button
                buttonText={
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: ".3rem",
                    }}
                    onClick={updateSettings}
                  >
                    Zapisz{" "}
                    <CheckSquareFill
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        paddingTop: ".4rem",
                      }}
                    />
                  </span>
                }
              />
            </div>
          </Section>
        </>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default Settings;
