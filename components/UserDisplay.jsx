import Image from "next/image";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
} from "@/components/mui";

const UserDisplay = ({ user }) => {
  const { nickname, name, picture, email, sub } = user;

  return (
    <>
      <Card
        sx={{
          backgroundColor: "hsla(90, 0%, 0%, 0.5)",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            backdropFilter: "blur(10px)",
            position: "absolute",
            minWidth: "100%",
            minHeight: "100%",
            zIndex: 0,
          }}
        />
        <CardMedia sx={{ display: "grid", placeContent: "center", zIndex: 1 }}>
          <Image
            alt={nickname}
            src={picture}
            width="200"
            height="200"
            style={{ borderRadius: "50%", marginTop: "2em", zIndex: 1 }}
          />
        </CardMedia>
        <CardContent sx={{ zIndex: 1 }}>
          <List
            component="dl"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1em",
            }}
          >
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Name
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Email
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {email}
            </Typography>
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Sub
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {sub}
            </Typography>
          </List>
        </CardContent>
      </Card>

      <hr />

      <Card
        sx={{
          width: "100%",
          backgroundColor: "hsla(90, 0%, 0%, 0.5)",
          color: "white",
          padding: "1em",
          // zIndex: 1,
          position: "relative",
        }}
      >
        {/* <div
          style={{
            backdropFilter: "blur(10px)",
            position: "absolute",
            minWidth: "100%",
            minHeight: "100%",
            zIndex: 0,
          }}
        /> */}
        <Typography component="dd" sx={{ fontWeight: "bold", zIndex: 1 }}>
          Your Data
        </Typography>
        <pre style={{ zIndex: 1 }}>{JSON.stringify(user, null, 2)}</pre>
      </Card>
    </>
  );
};

export default UserDisplay;
