import com.codeball.Application;
import org.hibernate.boot.MetadataBuilder;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.BootstrapServiceRegistryBuilder;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.boot.spi.MetadataImplementor;
import org.hibernate.cfg.Environment;
import org.hibernate.tool.hbm2ddl.SchemaUpdate;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy;
import org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.persistence.Entity;
import javax.sql.DataSource;
import java.io.File;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = Application.class)
public class DDLUpdateScriptGenerator {

    private static final String OUTPUT_UPDATE_SCRIPT_PATH = "build/update_script.sql";
    private static final String PACKAGE_PREFIX = "";

    @Autowired
    private DataSource dataSource;

    @Ignore
    @Test
    public void generateUpdateDdlScript() throws SQLException {
        Set<Class<?>> modelClasses = getEntityTypes();
        Map<String, Object> properties = getHibernateEnvironmentProperties();
        StandardServiceRegistry serviceRegistry = buildServiceRegistry(properties);
        MetadataSources metadataSources = buildMetadataSources(modelClasses, serviceRegistry);
        MetadataImplementor metadata = buildMetadata(serviceRegistry, metadataSources);

        prepareAndExecuteSchemaUpdate(serviceRegistry, metadata);
    }

    private Set<Class<?>> getEntityTypes() {
        return new Reflections(PACKAGE_PREFIX).getTypesAnnotatedWith(Entity.class);
    }

    private Map<String, Object> getHibernateEnvironmentProperties() {
        Map<String, Object> properties = new HashMap<>();
        properties.put(Environment.DATASOURCE, dataSource);
        properties.put(Environment.HBM2DDL_AUTO, "update");
        properties.put(Environment.IMPLICIT_NAMING_STRATEGY, "org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy");
        properties.put(Environment.PHYSICAL_NAMING_STRATEGY, "org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy");
        return properties;
    }

    private StandardServiceRegistry buildServiceRegistry(Map<String, Object> properties) {
        StandardServiceRegistryBuilder standardServiceRegistryBuilder = new StandardServiceRegistryBuilder(new BootstrapServiceRegistryBuilder().build());
        standardServiceRegistryBuilder.applySettings(properties);
        return standardServiceRegistryBuilder.build();
    }

    private MetadataSources buildMetadataSources(Set<Class<?>> modelClasses, StandardServiceRegistry serviceRegistry) {
        MetadataSources metadataSources = new MetadataSources(serviceRegistry);
        modelClasses.forEach(metadataSources::addAnnotatedClass);
        return metadataSources;
    }

    private MetadataImplementor buildMetadata(StandardServiceRegistry serviceRegistry, MetadataSources metadataSources) {
        MetadataBuilder metadataBuilder = metadataSources.getMetadataBuilder(serviceRegistry);
        return (MetadataImplementor) metadataBuilder.build();
    }

    private void prepareAndExecuteSchemaUpdate(StandardServiceRegistry serviceRegistry, MetadataImplementor metadata) {
        SchemaUpdate schemaUpdate = new SchemaUpdate(serviceRegistry, metadata);
        schemaUpdate.setHaltOnError(true);
        schemaUpdate.setOutputFile(new File(OUTPUT_UPDATE_SCRIPT_PATH).getAbsolutePath());
        schemaUpdate.setDelimiter(";");
        schemaUpdate.setFormat(true);
        schemaUpdate.execute(true, false);
    }

}