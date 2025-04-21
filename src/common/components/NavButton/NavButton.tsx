import { Button, styled } from "@mui/material"

type Props = {
  background?: string
}

export const NavButton = styled(Button)<Props>(({ background, theme }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  boxShadow: "0 0 0 2px #054B62, 4px 4px 0 0 #054B62",
  borderRadius: "2px",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: "#ffffff",
  background: background || theme.palette.primary.light,
}))
