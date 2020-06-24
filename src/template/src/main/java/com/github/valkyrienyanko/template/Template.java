package com.github.valkyrienyanko.template;

import com.github.valkyrienyanko.template.commands.CmdHelp;
import com.github.valkyrienyanko.template.configs.ConfigManager;
import com.github.valkyrienyanko.template.listeners.ListenerPlayerJoin;
import org.bukkit.Bukkit;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;

public class Template extends JavaPlugin {
    public static File pluginFolder;

    public static ConfigManager mainCM;
    public static YamlConfiguration mainConfig;

    @Override
    public void onEnable() {
        pluginFolder = getDataFolder();
        getLogger().info("Plugin enabled");

        registerConfigs();
        registerListeners();
        registerCommands();
    }

    @Override
    public void onDisable() {
        getLogger().info("Plugin disabled");
    }

    private void registerConfigs() {
        mainCM = new ConfigManager("config");
        mainConfig = mainCM.getConfig();

        setupMainConfig();
    }

    private void registerListeners() {
        PluginManager pm = Bukkit.getPluginManager();
        pm.registerEvents(new ListenerPlayerJoin(), this);
    }

    private void registerCommands() {
        getCommand("help").setExecutor(new CmdHelp());
    }

    private void setupMainConfig() {
        mainCM.defaultSet("test", "123");
        mainCM.saveConfig();
    }
}
