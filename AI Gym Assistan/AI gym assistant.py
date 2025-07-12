import cv2
import mediapipe as mp
import numpy as np
import tkinter as tk
from tkinter import messagebox
import threading

# ========== COMMONS ==========
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

# ========== ARM COUNTER ==========
def arm_counter():
    counter = 0
    stage = None

    cap = cv2.VideoCapture(0)
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            try:
                landmarks = results.pose_landmarks.landmark
                shoulder = [landmarks[11].x, landmarks[11].y]
                elbow = [landmarks[13].x, landmarks[13].y]
                wrist = [landmarks[15].x, landmarks[15].y]

                angle = calculate_angle(shoulder, elbow, wrist)

                # Display angle
                cv2.putText(image, str(int(angle)),
                            tuple(np.multiply(elbow, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

                # Arm curl logic
                if angle > 160:
                    stage = "down"
                if angle < 40 and stage == "down":
                    stage = "up"
                    counter += 1

            except:
                pass

            # Render counter
            cv2.rectangle(image, (0,0), (225,73), (245,117,16), -1)
            cv2.putText(image, 'ARMS', (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
            cv2.putText(image, str(counter), (10,70), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255,255,255), 2)

            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            cv2.imshow('Arm Counter', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()

# ========== SQUAT COUNTER ==========
def squat_counter():
    counter = 0
    stage = None

    cap = cv2.VideoCapture(0)
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            try:
                landmarks = results.pose_landmarks.landmark
                hip = [landmarks[24].x, landmarks[24].y]
                knee = [landmarks[26].x, landmarks[26].y]
                ankle = [landmarks[28].x, landmarks[28].y]

                angle = calculate_angle(hip, knee, ankle)

                cv2.putText(image, str(int(angle)),
                            tuple(np.multiply(knee, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

                if angle < 90:
                    stage = "down"
                if angle > 160 and stage == "down":
                    stage = "up"
                    counter += 1

            except:
                pass

            # Render counter
            cv2.rectangle(image, (0,0), (225,73), (245,117,16), -1)
            cv2.putText(image, 'SQUATS', (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
            cv2.putText(image, str(counter), (10,70), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255,255,255), 2)

            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            cv2.imshow('Squat Counter', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()

# ========== GUI ==========
def run_arm():
    threading.Thread(target=arm_counter).start()

def run_squat():
    threading.Thread(target=squat_counter).start()

def main_gui():
    root = tk.Tk()
    root.title("Pose Counter Selector")
    root.geometry("300x200")

    label = tk.Label(root, text="Choose a counter to run:", font=("Arial", 14))
    label.pack(pady=20)

    arm_btn = tk.Button(root, text="Arm Counter", font=("Arial", 12), command=run_arm)
    arm_btn.pack(pady=10)

    squat_btn = tk.Button(root, text="Squat Counter", font=("Arial", 12), command=run_squat)
    squat_btn.pack(pady=10)

    root.mainloop()

# ========== ENTRY POINT ==========
if __name__ == "__main__":
    main_gui()
