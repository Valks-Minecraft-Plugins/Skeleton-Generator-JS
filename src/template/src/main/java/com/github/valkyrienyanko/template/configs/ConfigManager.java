package com.github.valkyrienyanko.template.configs;

import java.io.File;
import java.io.IOException;

import com.github.valkyrienyanko.template.Template;
import org.bukkit.configuration.file.YamlConfiguration;

public class ConfigManager {
    private File file;
    private YamlConfiguration config;

    public ConfigManager(String name) {
        file = new File(Template.pluginFolder, name + ".yml");
        config = YamlConfiguration.loadConfiguration(file);
    }

    public void saveConfig() {
        try {
            config.save(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void reloadConfig() {
        config = YamlConfiguration.loadConfiguration(file);
    }

    public YamlConfiguration getConfig() {
        return config;
    }

    public void defaultSet(String path, Object value) {
        if (!config.isSet(path)) {
            config.set(path, value);
        }
    }
}