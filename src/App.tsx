import { ThemeMode } from "./utils/enums";
import { useTheme } from "./store/global";

const App = () => {
  const {
    mode,
    theme,
    setMode,
    toggleTheme,
  } = useTheme();

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: theme.spacing.xxxl,
        backgroundColor: theme.colors.background.page,
        color: theme.colors.text.primary,
        fontFamily: theme.font.family.primary,
      }}
    >
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: theme.spacing.xxl,
          backgroundColor: theme.colors.background.elevated,
          border: `${theme.border.width.thin} solid ${theme.colors.border.default}`,
          borderRadius: theme.radius.xl,
          boxShadow: theme.shadow.md,
        }}
      >
        <h1
          style={{
            marginTop: 0,
            fontSize: theme.font.size.xxxl,
          }}
        >
          YouTube Theme Test
        </h1>

        <p
          style={{
            color: theme.colors.text.secondary,
          }}
        >
          Current mode: {mode}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing.md,
          }}
        >
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              height: theme.button.size.md.height,
              paddingInline: theme.button.size.md.paddingX,
              backgroundColor:
                theme.colors.button.primaryBackground,
              color: theme.colors.button.primaryText,
              border: "none",
              borderRadius: theme.button.radius.rounded,
              cursor: "pointer",
            }}
          >
            Toggle theme
          </button>

          <button
            type="button"
            onClick={() => setMode(ThemeMode.Light)}
            style={{
              height: theme.button.size.md.height,
              paddingInline: theme.button.size.md.paddingX,
              backgroundColor:
                theme.colors.button.secondaryBackground,
              color: theme.colors.button.secondaryText,
              border: "none",
              borderRadius: theme.button.radius.rounded,
              cursor: "pointer",
            }}
          >
            Light mode
          </button>

          <button
            type="button"
            onClick={() => setMode(ThemeMode.Dark)}
            style={{
              height: theme.button.size.md.height,
              paddingInline: theme.button.size.md.paddingX,
              backgroundColor:
                theme.colors.button.secondaryBackground,
              color: theme.colors.button.secondaryText,
              border: "none",
              borderRadius: theme.button.radius.rounded,
              cursor: "pointer",
            }}
          >
            Dark mode
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;