# main.py
from agents.profile_agent import run_profile_agent
from agents.assessment_agent import run_assessment_agent
from agents.recommender_agent import run_recommender_agent
from agents.hackathon_agent import run_hackathon_agent

def main():
    print("\n=== Mavericks Coding Platform CLI ===")
    print("Choose an agent to run:")
    print("1. Profile Agent")
    print("2. Assessment Agent")
    print("3. Recommender Agent")
    print("4. Hackathon Agent")
    print("5. Exit")

    while True:
        choice = input("\nEnter your choice (1-5): ")

        if choice == "1":
            data = input("Enter user resume or profile info: ")
            result = run_profile_agent(data)
            print("\n[Profile Agent Output]\n", result)

        elif choice == "2":
            profile = input("Enter user profile text: ")
            result = run_assessment_agent(profile)
            print("\n[Assessment Agent Output]\n", result)

        elif choice == "3":
            profile = input("Enter user profile text: ")
            score = input("Enter assessment score: ")
            result = run_recommender_agent(profile, score)
            print("\n[Recommender Agent Output]\n", result)

        elif choice == "4":
            theme = input("Enter hackathon theme (e.g., AI for Education): ")
            result = run_hackathon_agent(theme)
            print("\n[Hackathon Agent Output]\n", result)

        elif choice == "5":
            print("Exiting...")
            break

        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
