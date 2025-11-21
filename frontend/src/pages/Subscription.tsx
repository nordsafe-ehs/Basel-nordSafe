import { Button, Grid2, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { useTranslation } from "react-i18next";

interface Subscription {
  status: "trial" | "active" | "expired";
  plan: string;
  price: string;
  subscriptionEndsAt: string;
  paymentLink: string;
  companyEmail: string;
  usage: {
    users: { used: number; limit: number };
    admins: { used: number; limit: number };
    projects: { used: number; limit: number };
    sdsSearch: { used: number; limit: number };
    sdsSave: { used: number; limit: number };
  };
}

const SubscriptionPage: React.FC = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { token } = useToken();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/subscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSubscription(data);
    })();
  }, [token]);

  const renderUsage = (
    label: string,
    used: number,
    limit: number,
    note?: string
  ) => (
    <Grid2 size={6}>
      <Typography>{label}</Typography>
      <LinearProgress variant="determinate" value={(used / limit) * 100} />
      <Typography>
        {used} / {limit} {note ? `(${note})` : ""}
      </Typography>
    </Grid2>
  );

  return (
    <>
      <Typography variant="h6" fontWeight={700} color="primary">
        {t("Current Plan")}
      </Typography>

      {subscription?.status === "trial" && (
        <>
          <Typography>{t("Free Trial")}</Typography>
          <Typography>
            Trial ends in{" "}
            {Math.ceil(
              (new Date(subscription?.subscriptionEndsAt).getTime() -
                Date.now()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days (
            {new Date(subscription?.subscriptionEndsAt).toLocaleDateString()})
          </Typography>
        </>
      )}

      {subscription?.status === "active" && (
        <>
          <Typography>
            {subscription?.plan} (${subscription?.price} / month)
          </Typography>
          <Typography>Status: Active</Typography>
          <Typography>
            {t("Renews on")}
            {new Date(subscription?.subscriptionEndsAt).toLocaleDateString()}
          </Typography>
        </>
      )}

      {subscription?.status === "expired" && (
        <>
          <Typography color="error">
            {t("Your subscription has expired")}
          </Typography>
          <Typography>Last Plan: {subscription?.plan}</Typography>
        </>
      )}

      {(subscription?.status === "trial" ||
        subscription?.status === "active") && (
        <>
          <Typography variant="h6" fontWeight={700} color="primary">
            {t("Usage Overview")}
          </Typography>
          <Grid2 container columnSpacing={2}>
            {renderUsage(
              "Users",
              subscription?.usage.users.used,
              subscription?.usage.users.limit
            )}
            {renderUsage(
              "Admins",
              subscription?.usage.admins.used,
              subscription?.usage.admins.limit
            )}
            {renderUsage(
              "Projects",
              subscription?.usage.projects.used,
              subscription?.usage.projects.limit
            )}

            {subscription?.status === "active" && (
              <>
                {renderUsage(
                  "SDS Searches",
                  subscription?.usage.sdsSearch.used,
                  subscription?.usage.sdsSearch.limit,
                  "Monthly"
                )}
                {renderUsage(
                  "SDS Saves",
                  subscription?.usage.sdsSave.used,
                  subscription?.usage.sdsSave.limit,
                  "Monthly"
                )}
              </>
            )}
          </Grid2>
        </>
      )}

      <Typography variant="h6" fontWeight={700} color="primary">
        {t("Manage Subscription")}
      </Typography>

      {subscription?.status === "trial" && (
        <Button
          variant="contained"
          color="primary"
          to={`${subscription.paymentLink}?locked_prefilled_email=${subscription.companyEmail}`}
          target="_blank"
          component={Link}
        >
          {t("Pay for your plan")}
        </Button>
      )}

      {subscription?.status === "active" && (
        <Button
          variant="contained"
          component={Link}
          to="https://billing.stripe.com/p/login/test_00w6oHfQrgTJ5sC40VfMA00"
          target="_blank"
        >
          {t("Open Subscription Portal")}
        </Button>
      )}

      {subscription?.status === "expired" && (
        <Button
          variant="contained"
          color="primary"
          to={`${subscription.paymentLink}?locked_prefilled_email=${subscription.companyEmail}`}
          component={Link}
          target="_blank"
        >
          {t("Renew Subscription")}
        </Button>
      )}
    </>
  );
};

export default SubscriptionPage;
