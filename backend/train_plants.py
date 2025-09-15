# backend/train_cassava.py
import os, json, pathlib, itertools
import tensorflow as tf
from tensorflow import keras
from keras import layers

# 1) ---- Paths & basic settings ----
# General datasets root path
DATASETS_ROOT = r"E:/Datasets"

# Choose your dataset folder here
DATASET_NAME = "corn"  # Changed to corn for plant disease detection
DATA_DIR = os.path.join(DATASETS_ROOT, DATASET_NAME)

IMG_SIZE = (224, 224)              # EfficientNetB0 default size
BATCH_SIZE = 32
VAL_SPLIT = 0.2
SEED = 123

OUT_DIR = "artifacts_plants"      # where to save models/plots for plant disease detection
os.makedirs(OUT_DIR, exist_ok=True)

print("TensorFlow:", tf.__version__)
print("Using data dir:", DATA_DIR)

# 2) ---- Load dataset (splits + performance tweaks) ----
train_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=VAL_SPLIT,
    subset="training",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    color_mode="rgb",
)

val_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=VAL_SPLIT,
    subset="validation",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    color_mode="rgb",
)

class_names = train_ds.class_names
num_classes = len(class_names)
print("Classes:", class_names)

# Speed up input pipeline
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.shuffle(1000).prefetch(AUTOTUNE)
val_ds   = val_ds.prefetch(AUTOTUNE)

# 3) ---- Data augmentation (light but helpful) ----
data_augmentation = keras.Sequential(
    [
        layers.RandomFlip("horizontal"),
        layers.RandomRotation(0.05),
        layers.RandomZoom(0.1),
        layers.RandomContrast(0.1),
    ],
    name="augment",
)



# 4) ---- Build model: Transfer Learning with EfficientNetB0 ----
#    (We normalize to [0,1] then EfficientNetB0 adds its own magic)
base = tf.keras.applications.EfficientNetB0(
    include_top=False, input_shape=IMG_SIZE + (3,), weights=None
)
base.trainable = True  # train from scratch

inputs = keras.Input(shape=IMG_SIZE + (3,))
x = layers.Rescaling(1./255)(inputs)
x = data_augmentation(x)
x = base(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.2)(x)
outputs = layers.Dense(num_classes, activation="softmax")(x)
model = keras.Model(inputs, outputs)

model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

# 5) ---- Callbacks ----
ckpt_path = os.path.join(OUT_DIR, "corn_efficientnetb0_best.keras")
callbacks = [
    keras.callbacks.ModelCheckpoint(ckpt_path, monitor="val_accuracy",
                                   save_best_only=True, verbose=1),
    keras.callbacks.EarlyStopping(monitor="val_loss", patience=5,
                                  restore_best_weights=True, verbose=1),
    keras.callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.3,
                                      patience=3, min_lr=1e-6, verbose=1),
]

# 6) ---- Train (head only) ----
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=15,
    callbacks=callbacks,
)

# 7) ---- Optional fine-tuning: unfreeze top of the backbone ----
# Unfreeze last N layers for a small learning rate
UNFREEZE_FROM = len(base.layers) - 40
for layer in base.layers[UNFREEZE_FROM:]:
    layer.trainable = True

model.compile(
    optimizer=keras.optimizers.Adam(1e-5),  # smaller LR for fine-tuning
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

history_ft = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=10,
    callbacks=callbacks,
)

# 8) ---- Save final model & label map ----
final_path = os.path.join(OUT_DIR, "corn_efficientnetb0_final.keras")
model.save(final_path)
with open(os.path.join(OUT_DIR, "label_map.json"), "w") as f:
    json.dump({i: name for i, name in enumerate(class_names)}, f, indent=2)

print("Saved:", final_path)
print("Saved label map to:", os.path.join(OUT_DIR, "label_map.json"))

# 9) ---- Quick evaluation (accuracy) ----
val_loss, val_acc = model.evaluate(val_ds, verbose=0)
print(f"Validation accuracy: {val_acc:.3f}")

# 10) ---- Predict one image (smoke test) ----
def predict_image(path):
    img = tf.keras.utils.load_img(path, target_size=IMG_SIZE)
    x = tf.keras.utils.img_to_array(img)
    x = tf.expand_dims(x, 0) / 255.0
    probs = model.predict(x, verbose=0)[0]
    idx = int(tf.argmax(probs))
    return class_names[idx], float(probs[idx])

# Put a sample file path here to test:
# sample_path = r"D:/datasets/cassava/Cassava__healthy/xxx.jpg"
# print(predict_image(sample_path))
