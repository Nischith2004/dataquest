### **Data Cleaning Summary**  

I cleaned several datasets by fixing common errors like duplicates, invalid values, and formatting issues. Here's what I did for each:  

#### **Users Data (users.csv)**  
- Removed duplicate user IDs (kept the most recent).  
- Fixed email formatting (removed extra `@`, `.com` typos, and spaces).  
- Removed invalid emails.  
- Deleted users with unrealistic ages (below 13 or above 100).  
- Standardized country names (e.g., `USA` → `United States`, `NULL` → `Unknown`).  
- Cleaned up names (removed special characters and extra spaces).  

#### **Subscriptions Data (subscriptions.csv)**  
- Removed duplicate payment entries.  
- Fixed subscription amounts based on plan type.  
- Standardized churn status.  
- Checked and corrected subscription periods.  

#### **Ratings Data (ratings.csv)**  
- Removed duplicate ratings (by user & movie).  
- Fixed invalid ratings (kept values between 0-5, rounded to the nearest 0.5).  
- Filled missing ratings with the median value.  
- Kept only valid review dates (from Nov 2024 onwards).  

#### **Watch History (watch_history.csv)**  
- Removed duplicate watch entries.  
- Kept only valid user IDs (matched with `cleaned_users.csv`).  
- Adjusted watch times to a valid range (1-240 minutes).  
- Standardized device names (invalid ones labeled as `Unknown`).  
- Removed records with incorrect dates.  

#### **Movies Data (movies.csv)**  
- Verified release years were valid numbers.  
- Removed movies with impossible runtimes (kept 60-240 mins).  
- Fixed genre & title formatting (capitalized properly, removed extra spaces).  

**Final Cleaned Files:**  
Saved cleaned versions as `cleaned_users.csv`, `cleaned_subscriptions.csv`, etc., ready for analysis.