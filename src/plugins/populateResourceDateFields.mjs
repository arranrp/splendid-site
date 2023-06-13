// This code was shamelessly stolen from:
// https://github.com/jordemort/jordemort.github.io/blob/96727c3e5b625d09a9d118a592e4e2485702695e/src/plugins/repodates.mjs

// Automatically populate pubDate and updatedDate from git metadata

import * as child from "node:child_process";
import * as os from "node:os";

function gitPubDate(mdPath)  {
  try {
    const stdout = child.execFileSync(
      "git", ["log", "--diff-filter=A", "--follow", "--format=%ai", "--", mdPath],
      { encoding: "utf8" }
    );

    return stdout.trim().split(os.EOL).pop();
  } catch (_) {
    return "";
  }
}

function gitUpdatedDate(mdPath) {
  try {
    return child.execFileSync(
      "git", ["log", "-1", "--pretty=format:%ai", "--", mdPath],
      { encoding: "utf8" }
    ).trim();
  } catch (_) {
    return "";
  }
}

export function repoDatesPlugin() {
  return function (_, file) {
    console.log(file.path);

    if (!file.path.includes('resources')) return;

    let pubDate = gitPubDate(file.path);

    if (pubDate.length < 1) {
      // Probably not committed yet
      // Return today's date so building it doesn't choke
      pubDate = Date().toString();
    }

    file.data.astro.frontmatter = {pubDate, ...file.data.astro.frontmatter};
    let updatedDate = gitUpdatedDate(file.path);
    if (updatedDate.length > 0 && updatedDate != pubDate) {
      file.data.astro.frontmatter = {updatedDate, ...file.data.astro.frontmatter};
    }
  }
}