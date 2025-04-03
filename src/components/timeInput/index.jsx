import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import colors from "../../constants/theme";

export default function TimeInput({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState("08");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const generateNumbers = (count) => {
    return Array.from({ length: count }, (_, i) =>
      i.toString().padStart(2, "0")
    );
  };

  const confirmTime = () => {
    const newTime = `${selectedHour}:${selectedMinute}`;
    onChange(newTime);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={() => setShowPicker(true)}>
        <Text style={styles.text}>{value || "00:00"}</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={showPicker} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o horário</Text>

            <View style={styles.pickerRow}>
              <FlatList
                data={generateNumbers(24)}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                style={styles.picker}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.pickerItem,
                      item === selectedHour ? styles.selected : {},
                    ]}
                    onPress={() => setSelectedHour(item)}
                  >
                    <Text style={styles.pickerText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <Text style={styles.separator}>:</Text>
              <FlatList
                data={generateNumbers(60)}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                style={styles.picker}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.pickerItem,
                      item === selectedMinute ? styles.selected : {},
                    ]}
                    onPress={() => setSelectedMinute(item)}
                  >
                    <Text style={styles.pickerText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={confirmTime}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  touchable: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: colors.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 60,
    maxHeight: 150,
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  pickerText: {
    fontSize: 18,
  },
  selected: {
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  separator: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
