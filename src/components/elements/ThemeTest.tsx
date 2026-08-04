import { ThemeMode } from "../../utils/enums";
import { useTheme } from "../../store/global";

const ThemeTest = () => {
  const { mode, theme, setMode, toggleTheme } = useTheme();

  const isDarkMode = mode === ThemeMode.Dark;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: theme.spacing.xxxl,
        backgroundColor: theme.colors.background.page,
        color: theme.colors.text.primary,
        fontFamily: theme.font.family.primary,
        transition: `background-color ${theme.transition.duration.normal} ${theme.transition.timing.easeInOut}`,
      }}
    >
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: theme.spacing.xxxl,
          backgroundColor: theme.colors.background.elevated,
          border: `${theme.border.width.thin} solid ${theme.colors.border.default}`,
          borderRadius: theme.radius.xl,
          boxShadow: theme.shadow.md,
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: theme.spacing.sm,
            fontSize: theme.font.size.xxxl,
            fontWeight: theme.font.weight.bold,
          }}
        >
          YouTube Theme Test
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: theme.spacing.xxl,
            color: theme.colors.text.secondary,
            fontSize: theme.font.size.md,
            lineHeight: theme.font.lineHeight.relaxed,
          }}
        >
          Current mode: <strong>{isDarkMode ? "Dark" : "Light"}</strong>
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing.md,
            marginBottom: theme.spacing.xxxl,
          }}
        >
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              height: theme.button.size.md.height,
              paddingInline: theme.button.size.md.paddingX,
              backgroundColor: theme.colors.button.primaryBackground,
              color: theme.colors.button.primaryText,
              border: "none",
              borderRadius: theme.button.radius.rounded,
              fontSize: theme.button.size.md.fontSize,
              fontWeight: theme.font.weight.medium,
              cursor: "pointer",
            }}
          >
            Switch to {isDarkMode ? "light" : "dark"} mode
          </button>

          <button
            type="button"
            onClick={() => setMode(ThemeMode.Light)}
            aria-pressed={mode === ThemeMode.Light}
            style={{
              height: theme.button.size.md.height,
              paddingInline: theme.button.size.md.paddingX,
              backgroundColor:
                mode === ThemeMode.Light
                  ? theme.colors.chip.selectedBackground
                  : theme.colors.chip.background,
              color:
                mode === ThemeMode.Light
                  ? theme.colors.chip.selectedText
                  : theme.colors.chip.text,
              border: "none",
              borderRadius: theme.button.radius.rounded,
              cursor: "pointer",
            }}
          >
            Light
          </button>

          <button
            type="button"
            onClick={() => setMode(ThemeMode.Dark)}
            aria-pressed={mode === ThemeMode.Dark}
            style={{
              height: theme.button.size.md.height,
              paddingInline: theme.button.size.md.paddingX,
              backgroundColor:
                mode === ThemeMode.Dark
                  ? theme.colors.chip.selectedBackground
                  : theme.colors.chip.background,
              color:
                mode === ThemeMode.Dark
                  ? theme.colors.chip.selectedText
                  : theme.colors.chip.text,
              border: "none",
              borderRadius: theme.button.radius.rounded,
              cursor: "pointer",
            }}
          >
            Dark
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gap: theme.spacing.lg,
          }}
        >
          <article
            style={{
              padding: theme.spacing.xl,
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.radius.lg,
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: theme.font.size.xl,
              }}
            >
              Video title
            </h2>

            <p
              style={{
                marginBottom: 0,
                color: theme.colors.text.secondary,
              }}
            >
              Channel name • 1.2M views • 2 days ago
            </p>
          </article>

          <div
            style={{
              display: "flex",
              gap: theme.spacing.md,
            }}
          >
            <span
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                backgroundColor: theme.colors.state.successBackground,
                color: theme.colors.state.success,
                borderRadius: theme.radius.round,
              }}
            >
              Success
            </span>

            <span
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                backgroundColor: theme.colors.state.warningBackground,
                color: theme.colors.state.warning,
                borderRadius: theme.radius.round,
              }}
            >
              Warning
            </span>

            <span
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                backgroundColor: theme.colors.state.errorBackground,
                color: theme.colors.state.error,
                borderRadius: theme.radius.round,
              }}
            >
              Error
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ThemeTest;
