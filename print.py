import subprocess
from pathlib import Path
from typing import List, Set


def collect_files(
    root_dirs: List[str] = None, ignore_patterns: List[str] = None
) -> List[Path]:
    if root_dirs is None:
        root_dirs = [".", "src", "tests", "docs"]

    if ignore_patterns is None:
        ignore_patterns = [
            ".DS_Store",
            ".gitignore",
            "__pycache__",
            "table.json",
            "print.py",
            "LICENSE",
            ".prettierrc.json",
            "package-lock.json",
        ]

    # Use a set to avoid duplicates
    all_files: Set[Path] = set()

    # Collect files from each root directory
    for directory in root_dirs:
        dir_path = Path(directory).resolve()
        if not dir_path.exists():
            continue

        # Use ** for recursive glob if not in root directory
        pattern = "*.*" if directory == "." else "**/*.*"
        files = [f for f in dir_path.glob(pattern) if f.is_file()]
        all_files.update(files)

    # Filter out ignored patterns
    filtered_files = [
        f
        for f in all_files
        if not any(pattern in str(f) for pattern in ignore_patterns)
    ]

    # Return sorted list
    return sorted(filtered_files)


def create_concatenated_file(files: List[Path], output_file: str = "temp.txt") -> Path:
    output_path = Path(output_file).resolve()
    base_dir = Path(".").resolve()

    with output_path.open("w", encoding="utf-8") as outfile:
        for file_path in files:
            try:
                # Get relative path for cleaner output
                rel_path = file_path.relative_to(base_dir)

                # Read and write file content with header
                content = file_path.read_text(encoding="utf-8")
                outfile.write(f"### {rel_path}\n{content}\n\n")
            except (UnicodeDecodeError, PermissionError) as e:
                print(f"Error processing {file_path}: {e}")

    return output_path


def append_directory_structure(output_file: Path) -> None:
    try:
        # Run tree command and capture output
        result = subprocess.run(
            ["tree", "-I", "node_modules|bower_components"],
            capture_output=True,
            text=True,
            check=False,
        )

        # Append tree output to file if command was successful
        if result.returncode == 0:
            with output_file.open("a", encoding="utf-8") as f:
                f.write("\n\n### Directory Structure\n")
                f.write(result.stdout)
        else:
            print(f"Tree command failed: {result.stderr}")
    except FileNotFoundError:
        print("Tree command not found. Make sure it's installed.")


def main():
    # Step 1: Collect files
    files = collect_files()

    # Step 2: Create concatenated file
    output_file = create_concatenated_file(files)

    # Step 3: Append directory structure
    append_directory_structure(output_file)

    print(f"Successfully created {output_file} with {len(files)} files.")


if __name__ == "__main__":
    main()
