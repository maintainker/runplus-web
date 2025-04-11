"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import { ChevronLeft, ChevronRight, Watch } from "lucide-react";
import { useSupabase } from "@/lib/context/supabaseContext";

export default function Settings() {
  const [units, setUnits] = useState("Kilometers");
  const [temperature, setTemperature] = useState("Celsius");
  const [defaultHighlight, setDefaultHighlight] = useState("Photo");
  const { userId, loading, error } = useSupabase();
  console.log(userId);
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile Settings</title>
        <meta name="description" content="User profile settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={styles.header}>
        <Link href="/profile" className={styles.backButton}>
          <ChevronLeft size={24} />
        </Link>
        <div className={styles.headerTitle}>Profile</div>
      </header>

      {/* Account Info */}
      <div className={styles.accountInfo}>
        <div className={styles.accountEmail}>ACCOUNT SYHWAN88@GMAIL.COM</div>
      </div>

      {/* Subscription */}
      <div className={styles.section}>
        <div className={styles.menuItem}>
          <div className={styles.menuContent}>
            <div className={styles.iconCircle}>
              <div className={styles.stravaIcon}>&gt;</div>
            </div>
            <div>
              <div className={styles.menuTitle}>Your Strava Subscription</div>
              <div className={styles.menuSubtitle}>
                Explore and manage your subscription
              </div>
            </div>
          </div>
          <ChevronRight size={20} className={styles.chevron} />
        </div>

        {/* Family Plan Banner */}
        <div className={styles.familyPlanContainer}>
          <div className={styles.familyPlanContent}>
            <div className={styles.familyPlanBadge}>Family Plan</div>
            <div className={styles.familyPlanTitle}>
              Four accounts. One plan.
            </div>
            <div className={styles.familyPlanSubtitle}>
              Big savings for family and friends.
            </div>
          </div>
          {/* Orange swoosh decoration */}
          <div className={styles.swooshDecoration}></div>
        </div>
      </div>

      {/* Connect devices section */}
      <div className={styles.section}>
        <div className={styles.menuItem}>
          <div className={styles.menuContent}>
            <div className={styles.iconContainer}>
              <Watch size={24} className={styles.deviceIcon} />
            </div>
            <div>
              <div className={styles.menuTitle}>Connect an app or device</div>
              <div className={styles.menuSubtitle}>
                Upload directly to Strava with almost any fitness app or device
              </div>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Manage apps and devices</div>
          <ChevronRight size={20} className={styles.chevron} />
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Restore Purchases</div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Change Email</div>
          <ChevronRight size={20} className={styles.chevron} />
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Help</div>
          <ChevronRight size={20} className={styles.chevron} />
        </div>
      </div>

      {/* Preferences Section */}
      <div className={styles.preferencesHeader}>PREFERENCES</div>

      <div className={styles.section}>
        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Appearance</div>
          <div className={styles.newBadge}>NEW</div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Privacy Controls</div>
          <div className={styles.newBadge}>NEW</div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Units of Measurement</div>
          <div className={styles.menuValue}>{units}</div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuTitle}>Temperature</div>
          <div className={styles.menuValue}>{temperature}</div>
        </div>

        <div className={styles.menuItem}>
          <div>
            <div className={styles.menuTitle}>Default Highlight Image</div>
            <div className={styles.menuDescription}>
              Highlight the map or a photo to represent your uploaded activities
              in the feed.
            </div>
          </div>
          <div className={styles.menuValue}>{defaultHighlight}</div>
        </div>
      </div>
    </div>
  );
}
