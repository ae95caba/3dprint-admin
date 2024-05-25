export default async function runBuild() {
  const buildHookUrl =
    "https://api.netlify.com/build_hooks/65b9b29b225667753fab3a34?clear_cache=true";

  try {
    const response = await fetch(buildHookUrl, {
      method: "POST",
    });

    if (response.ok) {
      console.log("Build triggered successfully");
    } else {
      console.error("Error triggering build:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
