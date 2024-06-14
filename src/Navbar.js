import { useDispatch } from "react-redux";

export function Navigation() {
  const dispatch = useDispatch();
  return (
    <div
      className="navigation-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 50px",
      }}
    >
      <h1
        className="hero-title"
        style={{
          fontSize: "35px",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Detect GQL Change
      </h1>
      <div className="navs">
        <div style={{ cursor: "pointer" }}>
          <a
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              fontSize: "22px",
            }}
            onClick={() => dispatch(navigate({ url: "/preferences" }))}
          >
            Set Preferences
          </a>
        </div>
      </div>
    </div>
  );
}
